import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendReplyToClient } from '@/lib/mailer';
import { htmlPage } from '@/lib/html-response';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const supabase = getSupabaseAdmin();

  const { data: contact, error } = await supabase
    .from('contacts')
    .select('id, email, subject, status, generated_reply, edited_reply')
    .eq('approval_token', token)
    .single();

  if (error || !contact) {
    return new NextResponse(
      htmlPage('Link not found', 'This approval link is invalid or has expired.'),
      { status: 404, headers: { 'Content-Type': 'text/html' } }
    );
  }

  if (contact.status === 'sent') {
    return new NextResponse(
      htmlPage('Already sent', `This reply was already sent to ${contact.email}.`),
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  if (contact.status === 'rejected') {
    return new NextResponse(
      htmlPage('Already rejected', 'This inquiry was already rejected and cannot be approved.'),
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    );
  }

  const replyText = contact.edited_reply || contact.generated_reply;
  if (!replyText) {
    return new NextResponse(
      htmlPage('No draft available', 'There is no AI-generated reply to send for this inquiry.'),
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    );
  }

  try {
    await sendReplyToClient({
      to: contact.email,
      subject: `Re: ${contact.subject}`,
      body: replyText
    });
  } catch (e) {
    console.error('Failed to send approved reply:', e);
    return new NextResponse(
      htmlPage('Send failed', 'The reply could not be sent. Check the server logs and try again.'),
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }

  const now = new Date().toISOString();
  await supabase
    .from('contacts')
    .update({ status: 'sent', approved_at: now, sent_at: now })
    .eq('id', contact.id);

  return new NextResponse(
    htmlPage('Approved & sent', `Your reply has been sent to ${contact.email}.`),
    { headers: { 'Content-Type': 'text/html' } }
  );
}
