import { Resend } from 'resend'

// Server-side only: the API key and recipient live in env vars so they never
// reach the browser bundle. .env.local is gitignored.
const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing required fields (name, email, message).' })
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL
  const toEmail = process.env.CONTACT_TO_EMAIL

  if (!process.env.RESEND_API_KEY || !fromEmail || !toEmail) {
    return res.status(500).json({ ok: false, error: 'Email service is not configured.' })
  }

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      reply_to: email,
      subject: subject ? `Portfolio contact: ${subject}` : `Portfolio contact from ${name}`,
      html: `
        <h2>New message from your portfolio contact form</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject || '(none)')}</p>
        <hr />
        <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
      `,
    })

    return res.status(200).json({ ok: true, id: data?.id })
  } catch (err) {
    return res.status(500).json({ ok: false, error: err?.message || 'Failed to send email.' })
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}