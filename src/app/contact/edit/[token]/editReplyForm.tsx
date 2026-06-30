'use client';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import RoundedButton from '@/components/animations/roundedButton';

type State = 'idle' | 'submitting' | 'success' | 'error';

export function EditReplyForm({
  token,
  initialReply
}: {
  token: string;
  initialReply: string;
}) {
  const [reply, setReply] = useState(initialReply);
  const [state, setState] = useState<State>('idle');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('submitting');
    try {
      const res = await fetch(`/api/contact/edit/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply })
      });
      if (!res.ok) throw new Error('Request failed');
      setState('success');
    } catch {
      setState('error');
    }
  };

  if (state === 'success') {
    return <p className="text-green-600">Reply sent successfully.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        rows={12}
        className="w-full rounded-xl border-gray-300 bg-gray-100 text-black"
      />
      {state === 'error' && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
      <div className="flex justify-end">
        <RoundedButton>
          {state === 'submitting' ? 'Sending...' : 'Send reply'}
        </RoundedButton>
      </div>
    </form>
  );
}
