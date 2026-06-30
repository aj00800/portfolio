import { getSupabaseAdmin } from '@/lib/supabase';
import { EditReplyForm } from './editReplyForm';

export default async function EditReplyPage({
  params
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = getSupabaseAdmin();

  const { data: contact, error } = await supabase
    .from('contacts')
    .select('id, name, email, subject, status, generated_reply, edited_reply')
    .eq('approval_token', token)
    .single();

  if (error || !contact) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <p className="text-lg">This link is invalid or has expired.</p>
      </div>
    );
  }

  if (contact.status === 'sent') {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <p className="text-lg">This reply was already sent to {contact.email}.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-2xl p-8 pt-20">
      <h1 className="mb-2 text-2xl font-medium">Edit reply</h1>
      <p className="mb-6 text-black/70">
        To: {contact.name} ({contact.email}) — Re: {contact.subject}
      </p>
      <EditReplyForm
        token={token}
        initialReply={contact.edited_reply || contact.generated_reply || ''}
      />
    </div>
  );
}
