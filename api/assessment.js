// Vercel serverless function: POST /api/assessment
// ScoreApp's webhook calls this. It is the one path from the scorecard into Kit.
// (ScoreApp's own Kit integration adds people through a Kit form, which leaves them unconfirmed,
// and Kit never emails an unconfirmed subscriber. The API cannot confirm him afterwards. So that
// integration stays off and this function does the whole job.)
//
//   LEAD_SIGNED_UP -> he exists in Kit as an active subscriber
//   QUIZ_FINISHED  -> score, band, lowest section, results link and date on his record,
//                     the assessment-taken tag, then the scorecard follow-up sequence (email 1 reads the fields)
//
// Needs KIT_API_KEY and ASSESSMENT_HOOK_TOKEN in Vercel env.

const SEQUENCE = 2958113; // scorecard follow-up
const TAG = 25434785;     // assessment-taken

// The three band lines, word for word as locked on 12 Nov 2026.
function bandFor(pct) {
  if (pct >= 85) return 'Dad of the Year Territory';
  if (pct >= 61) return "You're a good dad. A few areas to improve.";
  return 'Time to step up. We believe you will!';
}

async function kit(method, path, key, body) {
  try {
    const r = await fetch(`https://api.kit.com/v4${path}`, {
      method,
      headers: { 'X-Kit-Api-Key': key, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    let json = null;
    try { json = await r.json(); } catch (e) { /* no body */ }
    return { status: r.status, json };
  } catch (e) {
    return { status: 599, json: null };
  }
}

async function readBody(req) {
  let b = req.body;
  if (b === undefined) {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    b = Buffer.concat(chunks).toString('utf8');
  }
  if (Buffer.isBuffer(b)) b = b.toString('utf8');
  if (typeof b === 'string') {
    try { return JSON.parse(b); } catch (e) { return { raw: b }; }
  }
  if (b && typeof b === 'object' && !b.data && !b.email) {
    // a form post that carries the JSON inside one field
    for (const v of Object.values(b)) {
      if (typeof v === 'string' && v.trim().startsWith('{')) {
        try { return JSON.parse(v); } catch (e) { /* keep looking */ }
      }
    }
  }
  return b || {};
}

function findEmail(obj) {
  const s = JSON.stringify(obj || {});
  const m = s.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  return m ? m[0].toLowerCase() : null;
}

function lowestTitle(d) {
  if (d.lowest_category && d.lowest_category.title) return d.lowest_category.title;
  const cs = Array.isArray(d.category_scores) ? d.category_scores : [];
  let low = null;
  for (const c of cs) {
    const p = Number(c && c.percent);
    if (c && c.category && c.category.title && !Number.isNaN(p) && (low === null || p < low.p)) low = { p, t: c.category.title };
  }
  return low ? low.t : undefined;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).end();
  const key = process.env.KIT_API_KEY;
  const token = process.env.ASSESSMENT_HOOK_TOKEN;
  if (!key) return res.status(200).json({ skipped: 'env' });
  if (token && String(req.query.t || '') !== token) return res.status(403).end();

  const body = await readBody(req);
  const d = (body && body.data && typeof body.data === 'object') ? body.data : (body || {});
  const event = String((body && body.event_name) || '').toUpperCase();
  const email = (typeof d.email === 'string' && d.email.includes('@')) ? d.email.trim().toLowerCase() : findEmail(body);
  if (!email || email === 'scoreapp.testing@gmail.com') return res.status(200).json({ skipped: 'no-email-or-test' });
  const first_name = (typeof d.first_name === 'string' && d.first_name.trim()) ? d.first_name.trim().slice(0, 40) : undefined;

  const out = { event };
  const finished = event === 'QUIZ_FINISHED' || !!d.total_score;

  if (!finished) {
    // He gave his name and email. Put him on the list as active. No tag, no emails yet.
    out.subscriber = (await kit('POST', '/subscribers', key, { email_address: email, first_name, state: 'active' })).status;
  } else {
    const pct = Math.round(Number(d.total_score && d.total_score.percent));
    const fields = { assessment_date: new Date().toISOString().slice(0, 10) };
    if (!Number.isNaN(pct)) { fields.assessment_score = String(pct); fields.assessment_band = bandFor(pct); }
    const low = lowestTitle(d);
    if (low) fields.assessment_lowest_section = low;
    if (typeof d.result_url === 'string' && d.result_url.startsWith('http')) fields.assessment_results_link = d.result_url;

    const made = await kit('POST', '/subscribers', key, { email_address: email, first_name, state: 'active', fields });
    out.subscriber = made.status;
    const id = made.json && made.json.subscriber && made.json.subscriber.id;
    out.state = made.json && made.json.subscriber && made.json.subscriber.state;
    // The create call does not rewrite fields on someone who already exists, so set them by id as well.
    if (id) out.fields = (await kit('PUT', `/subscribers/${id}`, key, { fields })).status;
    out.tag = (await kit('POST', `/tags/${TAG}/subscribers`, key, { email_address: email })).status;
    // Last, so the fields are on his record before email 1 goes out.
    out.sequence = (await kit('POST', `/sequences/${SEQUENCE}/subscribers`, key, { email_address: email })).status;
  }

  const codes = [out.subscriber, out.fields, out.tag, out.sequence].filter((c) => typeof c === 'number');
  // Kit down, throttled or refusing the key: answer with an error so ScoreApp tries again (it retries up to 5 times).
  if (codes.some((c) => c >= 500 || c === 429 || c === 401)) return res.status(502).json(out);
  return res.status(200).json(out);
}
