// api/contact.js
// Vercel Serverless Function — handles NyayaVedika contact form submissions
// Forwards to AgentMail inbox: nyayavedika@agentmail.to

const AGENTMAIL_KEY = 'am_us_ac1e7da581c2ee2cd244713092ccc20dfd7070826bbe1aa0e858eb193abcef76';
const AGENTMAIL_URL = 'https://api.agentmail.to';
const INBOX_ID = 'nyayavedika@agentmail.to';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    const emailBody = `
New Contact — NyayaVedika
══════════════════════════

Name:    ${name || 'Not provided'}
Email:   ${email || 'Not provided'}
Phone:   ${phone || 'Not provided'}

Message:
${message || 'Not provided'}

──────────────────────────────────
Submitted from: nyayavedika.in
Time: ${new Date().toISOString()}
    `.trim();

    const response = await fetch(`${AGENTMAIL_URL}/inboxes/${INBOX_ID}/messages/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AGENTMAIL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'contact@nyayavedika.in',
        subject: `NyayaVedika Contact from ${name || 'Anonymous'}`,
        text: emailBody,
      }),
    });

    if (!response.ok) {
      throw new Error(`AgentMail error: ${response.status}`);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ success: false, error: 'Failed to send message' });
  }
}
