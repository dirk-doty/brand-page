// Review-only: saves the 25 Nov session answers into Kit draft broadcast 27286654 (never sent) so Claude can read them.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).end();
  const key = process.env.KIT_API_KEY;
  if (!key) return res.status(200).json({ ok: false, why: 'no key' });
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) {} }
  const txt = JSON.stringify(body || {}, null, 1).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  try {
    const r = await fetch('https://api.kit.com/v4/broadcasts/27286654', {
      method: 'PUT',
      headers: { 'X-Kit-Api-Key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: '<pre>' + txt + '</pre>' }),
    });
    return res.status(200).json({ ok: r.ok, status: r.status });
  } catch (e) {
    return res.status(200).json({ ok: false, why: String(e) });
  }
}
