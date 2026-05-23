import { Resend } from 'resend'

const SALES_INBOX = 'sales.labsolutiontechnologies@gmail.com'
const FROM_ADDRESS =
  process.env.CONTACT_FROM || 'LabSolution Site <onboarding@resend.dev>'

const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[char]
  )

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set')
    return res.status(500).json({ error: 'Email service not configured' })
  }

  const { name, email, phone, message, website } = req.body || {}

  // Honeypot: hidden field bots tend to fill, real users don't see.
  // Pretend success so bots don't retry.
  if (website) return res.status(200).json({ ok: true })

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: 'Name, email, and message are required.' })
  }

  if (
    name.length > 200 ||
    email.length > 200 ||
    (phone && phone.length > 50) ||
    message.length > 5000
  ) {
    return res.status(413).json({ error: 'Submission too large.' })
  }

  // Public preview deploys must not send real email.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return res.status(200).json({ ok: true, preview: true })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: SALES_INBOX,
      replyTo: email,
      subject: `New inquiry from ${name} — LabSolution site`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '(not provided)'}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escape(name)}</p>
<p><strong>Email:</strong> ${escape(email)}</p>
<p><strong>Phone:</strong> ${escape(phone || '(not provided)')}</p>
<p><strong>Message:</strong></p>
<p>${escape(message).replace(/\n/g, '<br>')}</p>`,
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(502).json({ error: 'Failed to send message.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact handler error:', err)
    return res.status(500).json({ error: 'Internal error.' })
  }
}
