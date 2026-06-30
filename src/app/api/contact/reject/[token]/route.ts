import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { htmlPage } from '@/lib/html-response';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const supabase = getSupabaseAdmin();

  const { data: contact, error } = await supabase
    .from('contacts')
    .select('id, status')
    .eq('approval_token', token)
    .single();

  if (error || !contact) {
    return new NextResponse(
      htmlPage('Link not found', 'This link is invalid or has expired.'),
      { status: 404, headers: { 'Content-Type': 'text/html' } }
    );
  }

  if (contact.status === 'sent') {
    return new NextResponse(
      htmlPage('Already sent', 'This reply was already approved and sent — it cannot be rejected now.'),
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    );
  }

  await supabase.from('contacts').update({ status: 'rejected' }).eq('id', contact.id);

  return new NextResponse(
    htmlPage('Rejected', 'This inquiry has been marked as rejected. No email was sent.'),
    { headers: { 'Content-Type': 'text/html' } }
  );
}
