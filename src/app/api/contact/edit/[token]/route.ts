import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendReplyToClient } from '@/lib/mailer';

const editSchema = z.object({
  reply: z.string().trim().min(1).max(5000)
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = editSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data: contact, error } = await supabase
    .from('contacts')
    .select('id, email, subject, status')
    .eq('approval_token', token)
    .single();

  if (error || !contact) {
    return NextResponse.json({ error: 'Invalid or expired link' }, { status: 404 });
  }

  if (contact.status === 'sent') {
    return NextResponse.json(
      { error: 'This reply was already sent.' },
      { status: 400 }
    );
  }

  try {
    await sendReplyToClient({
      to: contact.email,
      subject: `Re: ${contact.subject}`,
      body: parsed.data.reply
    });
  } catch (e) {
    console.error('Failed to send edited reply:', e);
    return NextResponse.json(
      { error: 'Failed to send the email. Please try again.' },
      { status: 500 }
    );
  }

  const now = new Date().toISOString();
  await supabase
    .from('contacts')
    .update({
      edited_reply: parsed.data.reply,
      status: 'sent',
      approved_at: now,
      sent_at: now
    })
    .eq('id', contact.id);

  return NextResponse.json({ success: true });
}
