// Vercel serverless function: POST /api/checkout
// Opens a Stripe Checkout Session for the card form that sits inside the offer box (embedded Checkout).
// Body: { bump: true | false }. Only two carts exist: Dad Shift, or Dad Shift and The Phone Talk (the $39 bundle price).
// Needs in Vercel env: STRIPE_KEY (the restricted key, with Checkout Sessions set to Write).
// Fulfilment does not change: Stripe still sends checkout.session.completed to api/stripe-webhook.js, which reads the same price ids.

const PRICE = {
  deck: 'price_1UUtpoRSkOmNEmoxmnO1G44Z', // Dad Shift $29
  both: 'price_1Uccm1RSkOmNEmoxXwJRoG9D', // Dad Shift and The Phone Talk $39
};
const SITES = ['https://doty.media', 'https://www.doty.media'];

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).end();
  const origin = req.headers.origin;
  if (origin && !SITES.includes(origin)) return res.status(403).end();
  const key = process.env.STRIPE_KEY;
  if (!key) return res.status(503).json({ error: 'not-configured' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const cart = body && body.bump === true ? 'both' : 'deck';

  const p = new URLSearchParams();
  p.set('mode', 'payment');
  p.set('ui_mode', 'embedded');
  p.set('line_items[0][price]', PRICE[cart]);
  p.set('line_items[0][quantity]', '1');
  p.set('allow_promotion_codes', 'true'); // the test orders use a 100 percent off code
  p.set('return_url', 'https://doty.media/thanks?' + (cart === 'both' ? 'p=both&' : '') + 'session_id={CHECKOUT_SESSION_ID}');

  let r, j = null;
  try {
    r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Stripe-Version': '2024-06-20', // pinned: on this version the embedded form is ui_mode "embedded"
      },
      body: p.toString(),
    });
    j = await r.json();
  } catch (e) {
    return res.status(502).json({ error: 'stripe-unreachable' });
  }
  if (!r.ok || !j || !j.client_secret) {
    return res.status(502).json({ error: 'stripe', type: j && j.error ? j.error.type : null, code: j && j.error ? (j.error.code || null) : null });
  }
  return res.status(200).json({ clientSecret: j.client_secret });
}
