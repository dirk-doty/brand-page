// Review-only: receives the 25 Nov session answers and writes them to the runtime log so Claude can read them.
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).end(); return; }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) {} }
  console.log('DOTY_SESSION_ANSWERS ' + JSON.stringify(body));
  res.status(200).json({ ok: true });
};
