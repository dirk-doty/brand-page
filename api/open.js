// Vercel serverless function: /api/open?s=<Kit subscriber id>&d=deck|phone
// Tags the subscriber in Kit as having opened the swipe deck. Needs KIT_API_KEY in Vercel env.
const TAGS = { deck: 25486710, phone: 25486718 };

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', 'https://doty.media');
  const s = String(req.query.s || '').replace(/\D/g, '');
  const d = req.query.d === 'phone' ? 'phone' : 'deck';
  const key = process.env.KIT_API_KEY;
  if (!s || !key) return res.status(204).end();
  try {
    const r = await fetch(`https://api.kit.com/v4/tags/${TAGS[d]}/subscribers/${s}`, {
      method: 'POST',
      headers: { 'X-Kit-Api-Key': key, 'Content-Type': 'application/json' },
    });
    return res.status(r.ok ? 204 : 202).end();
  } catch (e) {
    return res.status(202).end();
  }
}
