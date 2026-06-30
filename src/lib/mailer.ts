import nodemailer from 'nodemailer';

export function getMailTransporter() {
  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) return null;
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD }
  });
}

export async function sendReplyToClient(opts: {
  to: string;
  subject: string;
  body: string;
}) {
  const transporter = getMailTransporter();
  if (!transporter) throw new Error('Gmail is not configured');
  const { GMAIL_USER } = process.env;

  await transporter.sendMail({
    from: GMAIL_USER,
    to: opts.to,
    subject: opts.subject,
    text: opts.body
  });
}
