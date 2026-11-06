// Vercel serverless function: POST /api/assessment
// ScoreApp's webhook calls this when a dad finishes the assessment.
// ScoreApp's own Kit integration already writes the score, band and lowest section to his Kit record.
// This does the two things that integration can't: makes him active without a confirm email,
// and starts the Assessment follow-up sequence. Needs KIT_API_KEY and ASSESSMENT_HOOK_TOKEN in Vercel env.

const SEQUENCE = 2958113; // Assessment follow-up
const TAG = 25434785;     // assessment-taken

async function kit(path, key, body) {
  const r = await fetch(`https://api.kit.com/v4${path}`, {
    method: 'POST',
    headers: { 'X-Kit-Api-Key': key, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  return r.status;
}

function findEmail(obj) {
  const s = JSON.stringify(obj || {});
  const m = s.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  return m ? m[0].toLowerCase() : null;
}
function findFirstName(obj) {
  const s = JSON.stringify(obj || {});
  const m = s.match(/"(?:first_name|firstName|first name|First Name)"\s*:\s*"([^"]{1,40})"/i);
  return m ? m[1] : undefined;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).end();
  const key = process.env.KIT_API_KEY;
  const token = process.env.ASSESSMENT_HOOK_TOKEN;
  if (!key) return res.status(200).json({ skipped: 'env' });
  if (token && String(req.query.t || '') !== token) return res.status(403).end();

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = { raw: body }; } }
  const email = findEmail(body);
  if (!email || email === 'scoreapp.testing@gmail.com') return res.status(200).json({ skipped: 'no-email-or-test' });
  const first_name = findFirstName(body);

  const out = { email };
  out.subscriber = await kit('/subscribers', key, {
    email_address: email, first_name, state: 'active',
    fields: { assessment_date: new Date().toISOString().slice(0, 10) },
  });
  out.tag = await kit(`/tags/${TAG}/subscribers`, key, { email_address: email });
  out.sequence = await kit(`/sequences/${SEQUENCE}/subscribers`, key, { email_address: email });
  return res.status(200).json(out);
}
