import { useState, useRef } from 'react';
import DotyLogo from './DotyLogo';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Sign up at https://formspree.io, create a form, and replace this with your form endpoint.
// Example: 'https://formspree.io/f/abcdefgh'
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdajgrkj';

export default function FooterCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    if (FORMSPREE_ENDPOINT) {
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (res.ok) {
          setSubmitted(true);
        } else {
          setError('Something went wrong. Please try again.');
        }
      } catch {
        setError('Something went wrong. Please try again.');
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

      <div className="px-6 md:px-16 max-w-7xl mx-auto pt-14 md:pt-20 pb-8 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <span className="font-body text-doty-orange text-xs tracking-[0.2em] uppercase block mb-8">Join the Movement</span>

          <h2 className="font-display text-doty-gold text-5xl md:text-7xl font-bold leading-tight mb-6">
            Let's Help Dads<br />Everywhere Avoid<br />the Pain of Regret.
          </h2>

          <p className="font-body text-white/60 text-lg max-w-xl mb-16 leading-relaxed">
            Be first to know when National Parks Hunt drops, get early membership access, and join a brotherhood of dads building their legacy.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block border border-doty-orange/40 px-8 py-4"
            >
              <p className="font-display text-white text-xl">Welcome to the brotherhood. We'll be in touch.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl">
              <div className="flex items-center border-b-2 border-white/20 pb-4 gap-4 focus-within:border-doty-orange transition-colors duration-300">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-transparent font-body text-lg text-white placeholder:text-white/25 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-doty-orange text-white font-body text-sm tracking-[0.1em] uppercase px-5 py-2.5 hover:bg-white hover:text-doty-green transition-all duration-300 whitespace-nowrap"
                >
                  Join Free <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="font-body text-white/20 text-xs mt-3 tracking-wide">
                No spam. Just tools, inspiration, and community for dads.
              </p>
              {error && <p className="font-body text-red-400 text-xs mt-2">{error}</p>}
            </form>
          )}
        </motion.div>

        {/* Footer bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="opacity-40">
            <img
              src="/images/logo-dark.png"
              alt="Dad of the Year"
              width={140}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-start md:items-center">
            <span className="font-body text-white/25 text-xs tracking-widest uppercase">© 2026 Dad of the Year, LLC.</span>
            <span className="font-body text-white/25 text-xs tracking-widest uppercase">All Rights Reserved.</span>
            <a href="/terms" className="font-body text-white/25 text-xs tracking-widest uppercase hover:text-white/50 transition-colors">Terms of Use</a>
            <a href="/privacy" className="font-body text-white/25 text-xs tracking-widest uppercase hover:text-white/50 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>

      <div className="h-1.5 bg-doty-orange" />
    </section>
  );
}