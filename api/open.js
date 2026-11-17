// Vercel serverless function: /api/open?s=<Kit subscriber id>&d=deck|phone-talk|share
// Tags the subscriber in Kit: opened Dad Shift, opened The Phone Talk, or texted the scorecard from the share page. Needs KIT_API_KEY in Vercel env.
const TAGS = { deck: 25486710, phone: 25486718, share: 25434790 }; // deck-opened, phone-talk-opened, shared-with-3

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', 'https://doty.media');
  const s = String(req.query.s || '').replace(/\D/g, '');
  const q = String(req.query.d || '');
  const d = (q === 'phone' || q === 'phone-talk') ? 'phone' : q === 'share' ? 'share' : q === 'deck' ? 'deck' : null;
  if (!d) return res.status(204).end();
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
