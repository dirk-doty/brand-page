// Vercel serverless function: POST /api/stripe-webhook
// Stripe sends checkout.session.completed here. We treat the event as a hint only:
// we re-fetch the session from Stripe with our own key, so a forged post can't do anything.
// Then: create or find the buyer in Kit, tag by product, and start the Dad Shift welcome sequence.
// Needs in Vercel env: STRIPE_KEY (restricted key, read Checkout Sessions) and KIT_API_KEY.

const PRICES = {
  price_1UUtpoRSkOmNEmoxmnO1G44Z: 'deck',   // Dad Shift $29
  price_1UUtpxRSkOmNEmoxjumeVMCo: 'phone',  // The Phone Talk $19
  price_1UVdfQRSkOmNEmoxE3vxHq7a: 'reset',  // The Reset $149
  price_1Uccm1RSkOmNEmoxXwJRoG9D: 'both',   // Dad Shift and The Phone Talk $39 (the bundle tile)
};
const TAGS = { deck: 25434786, phone: 25434787, reset: 25434788 };
const WELCOME_SEQUENCE = 2958112; // Dad Shift welcome
const PHONE_TALK_SEQUENCE = 2974405; // The Phone Talk welcome, for a dad who bought only The Phone Talk

async function kit(path, key, body) {
  const r = await fetch(`https://api.kit.com/v4${path}`, {
    method: 'POST',
    headers: { 'X-Kit-Api-Key': key, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  let j = null;
  try { j = await r.json(); } catch (e) {}
  return { ok: r.ok, status: r.status, json: j };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).end();
  const stripeKey = process.env.STRIPE_KEY;
  const kitKey = process.env.KIT_API_KEY;
  if (!stripeKey || !kitKey) return res.status(200).json({ skipped: 'env' });

  let event = req.body;
  if (typeof event === 'string') { try { event = JSON.parse(event); } catch (e) { return res.status(400).end(); } }
  if (!event || event.type !== 'checkout.session.completed') return res.status(200).json({ ignored: true });
  const id = String(event.data?.object?.id || '');
  if (!/^cs_[A-Za-z0-9_]+$/.test(id)) return res.status(400).end();

  // Truth comes from Stripe, not from the post.
  const sr = await fetch(`https://api.stripe.com/v1/checkout/sessions/${id}?expand[]=line_items`, {
    headers: { Authorization: `Bearer ${stripeKey}` },
  });
  if (!sr.ok) return res.status(200).json({ skipped: 'stripe', status: sr.status });
  const session = await sr.json();
  // 'no_payment_required' is an order made free by a 100 percent off promotion code (our test orders).
  if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') return res.status(200).json({ skipped: 'unpaid' });
  const email = session.customer_details?.email || session.customer_email;
  if (!email) return res.status(200).json({ skipped: 'no-email' });
  const name = (session.customer_details?.name || '').split(' ')[0] || undefined;
  const bought = new Set();
  for (const li of session.line_items?.data || []) {
    const k = PRICES[li.price?.id];
    if (k === 'both') { bought.add('deck'); bought.add('phone'); }
    else if (k) bought.add(k);
  }
  if (!bought.size) return res.status(200).json({ skipped: 'no-known-product' });

  // Create or update the subscriber, then tag and sequence.
  const sub = await kit('/subscribers', kitKey, { email_address: email, first_name: name, state: 'active' });
  const sid = sub.json?.subscriber?.id;
  const out = { email, bought: [...bought], subscriber: sid || null, tags: {}, sequence: null };
  for (const k of bought) {
    const t = await kit(`/tags/${TAGS[k]}/subscribers`, kitKey, { email_address: email });
    out.tags[k] = t.status;
  }
  // The Dad Shift welcome email also carries The Phone Talk link for anyone tagged phone-talk-buyer,
  // so a dad who bought both gets one email. Only a Phone Talk only buyer gets the Phone Talk welcome.
  if (bought.has('deck')) {
    const q = await kit(`/sequences/${WELCOME_SEQUENCE}/subscribers`, kitKey, { email_address: email });
    out.sequence = q.status;
  } else if (bought.has('phone')) {
    const q = await kit(`/sequences/${PHONE_TALK_SEQUENCE}/subscribers`, kitKey, { email_address: email });
    out.sequence = q.status;
  }
  return res.status(200).json(out);
}
