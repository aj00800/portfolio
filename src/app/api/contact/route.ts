import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseAdmin } from '@/lib/supabase';
import { getMailTransporter } from '@/lib/mailer';
import { analyzeInquiry, type AiAnalysis } from '@/lib/ai';

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  subject: z.string().trim().min(1).max(200),
  projectType: z.string().trim().max(120).optional().or(z.literal('')),
  budget: z.string().trim().max(120).optional().or(z.literal('')),
  timeline: z.string().trim().max(120).optional().or(z.literal('')),
  message: z.string().trim().min(1).max(5000),
  // honeypot field: real users never fill this in
  website: z.string().max(0).optional().or(z.literal(''))
});

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() ?? 'unknown';
}

async function sendNotificationEmail(
  data: z.infer<typeof contactSchema>,
  approvalToken: string,
  ai?: AiAnalysis
) {
  const { GMAIL_USER, NOTIFY_TO_EMAIL } = process.env;
  const transporter = getMailTransporter();
  if (!transporter || !GMAIL_USER) return;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const approveUrl = `${siteUrl}/api/contact/approve/${approvalToken}`;
  const rejectUrl = `${siteUrl}/api/contact/reject/${approvalToken}`;
  const editUrl = `${siteUrl}/contact/edit/${approvalToken}`;

  const aiSection = ai
    ? [
        '',
        '--- AI Analysis ---',
        `Category:     ${ai.category}`,
        `Sentiment:    ${ai.sentiment}`,
        `Lead quality: ${ai.lead_quality}`,
        `Lead score:   ${ai.lead_score}/100`,
        '',
        `Summary: ${ai.summary}`,
        '',
        '--- Draft reply ---',
        ai.generated_reply,
        '',
        '--- Actions ---',
        `Approve & send: ${approveUrl}`,
        `Reject:         ${rejectUrl}`,
        `Edit before sending: ${editUrl}`
      ]
    : [];

  await transporter.sendMail({
    from: GMAIL_USER,
    to: NOTIFY_TO_EMAIL || GMAIL_USER,
    replyTo: data.email,
    subject: `New inquiry: ${data.subject}${ai ? ` [${ai.lead_quality} — ${ai.lead_score}/100]` : ''}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.company ? `Company: ${data.company}` : null,
      data.projectType ? `Project type: ${data.projectType}` : null,
      data.budget ? `Budget: ${data.budget}` : null,
      data.timeline ? `Timeline: ${data.timeline}` : null,
      '',
      data.message,
      ...aiSection
    ]
      .filter((l) => l !== null)
      .join('\n')
  });
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Honeypot tripped — silently report success without doing anything.
  if (parsed.data.website) {
    return NextResponse.json({ success: true });
  }

  const { website: _website, ...data } = parsed.data;

  let contactId: string;
  let approvalToken: string;
  try {
    const supabase = getSupabaseAdmin();
    const { data: row, error } = await supabase
      .from('contacts')
      .insert({
        name: data.name,
        email: data.email,
        company: data.company || null,
        subject: data.subject,
        project_type: data.projectType || null,
        budget: data.budget || null,
        timeline: data.timeline || null,
        message: data.message
      })
      .select('id, approval_token')
      .single();
    if (error) throw error;
    contactId = row.id;
    approvalToken = row.approval_token;
  } catch (error) {
    console.error('Failed to store contact submission:', error);
    return NextResponse.json(
      { error: 'Failed to save your message. Please try again later.' },
      { status: 500 }
    );
  }

  // AI analysis runs after we've already saved the row, so a failure here
  // never loses the submission.
  let ai: AiAnalysis | undefined;
  try {
    ai = await analyzeInquiry(data);
    const supabase = getSupabaseAdmin();
    await supabase
      .from('contacts')
      .update({
        summary: ai.summary,
        category: ai.category,
        sentiment: ai.sentiment,
        lead_quality: ai.lead_quality,
        lead_score: ai.lead_score,
        generated_reply: ai.generated_reply,
        ai_analyzed_at: new Date().toISOString()
      })
      .eq('id', contactId);
  } catch (error) {
    console.error('AI analysis failed:', error);
  }

  try {
    await sendNotificationEmail(data, approvalToken, ai);
  } catch (error) {
    console.error('Failed to send notification email:', error);
  }

  return NextResponse.json({ success: true });
}
