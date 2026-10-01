import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Sign up at https://formspree.io, create a form, and replace this with your form endpoint.
// Example: 'https://formspree.io/f/abcdefgh'
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdajgrkj';

// Sent with each signup so Formspree keeps a record of exactly what the person agreed to, and when.
// Update these dates whenever the Terms of Use or Privacy Policy effective date changes.
const CONSENT_RECORD = {
  consent: 'By joining, you agree to receive emails from Dad of the Year and to our Terms of Use. Unsubscribe anytime. See our Privacy Policy.',
  terms_effective: '2026-10-01',
  privacy_effective: '2026-10-01',
};

export default function FooterCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef(null);
  const honeypotRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    setError('');

    if (FORMSPREE_ENDPOINT) {
      setSubmitting(true);
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          // _gotcha is Formspree's honeypot: bots fill it in and Formspree silently drops the submission.
          body: JSON.stringify({ email, ...CONSENT_RECORD, _gotcha: honeypotRef.current?.value ?? '' }),
        });
        if (res.ok) {
          setSubmitted(true);
        } else {
          setError('Something went wrong. Please try again.');
        }
      } catch {
        setError('Something went wrong. Please try again.');
      } finally {
        setSubmitting(false);
      }
    } else {
      // Mailto fallback until Formspree endpoint is configured
      window.location.href = `mailto:dirk@doty.media?subject=DOTY%20List%20Signup&body=Please%20add%20me%20to%20the%20list%3A%20${encodeURIComponent(email)}`;
      setSubmitted(true);
    }
  };

  return (
    <section id="join" ref={ref} className="bg-doty-green">
      {/* Orange top border */}
      <div className="h-1.5 bg-doty-orange" />

      <div className="px-6 md:px-16 max-w-7xl mx-auto pt-14 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <span className="font-body text-doty-orange-light text-xs tracking-[0.2em] uppercase block mb-8">Join the Movement</span>

          <h2 className="font-display text-doty-gold text-5xl md:text-7xl font-bold leading-tight mb-6">
            Let's Help Dads<br />Everywhere Avoid<br />the Pain of Regret.
          </h2>

          <p className="font-body text-white/60 text-lg max-w-xl mb-16 leading-relaxed">
            Be first to know when National Parks Hunt drops, get early membership access, and join a brotherhood of dads building their legacy.
          </p>

          {!submitted && (
            <form onSubmit={handleSubmit} className="max-w-xl">
              {/* Spam trap: invisible to people and screen readers, unreachable by keyboard */}
              <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                <input ref={honeypotRef} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="flex items-center border-b-2 border-white/20 pb-4 gap-4 focus-within:border-doty-orange transition-colors duration-300">
                <label htmlFor="join-email" className="sr-only">Email address</label>
                <input
                  id="join-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-transparent font-body text-lg text-white placeholder:text-white/60 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 bg-doty-orange-deep text-white font-body text-sm tracking-[0.1em] uppercase px-5 py-2.5 hover:bg-white hover:text-doty-green transition-all duration-300 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-doty-orange-deep disabled:hover:text-white"
                >
                  Join Free <ArrowRight className="w-4 h-4" aria-hidden="true" focusable="false" />
                </button>
              </div>
              <p className="font-body text-white/60 text-xs mt-3 tracking-wide">
                No spam. Just tools, inspiration, and community for dads.
              </p>
              <p className="font-body text-white/60 text-xs mt-2 tracking-wide">
                By joining, you agree to receive emails from Dad of the Year and to our{' '}
                <a href="/terms" className="underline underline-offset-2 text-white/80 hover:text-white transition-colors">Terms of Use</a>.
                Unsubscribe anytime. See our{' '}
                <a href="/privacy" className="underline underline-offset-2 text-white/80 hover:text-white transition-colors">Privacy Policy</a>.
              </p>
            </form>
          )}

          {/* Persistent live region so screen readers announce the result of the submit */}
          <div role="status" aria-live="polite">
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block border border-doty-orange/40 px-8 py-4"
              >
                <p className="font-display text-white text-xl">You're in. Watch your inbox.</p>
              </motion.div>
            )}
            {error && <p className="font-body text-red-300 text-xs mt-2">{error}</p>}
          </div>
        </motion.div>
      </div>
    </section>
  );
}