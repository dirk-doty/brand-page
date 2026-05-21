import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PILLARS = [
  {
    title: 'Empower Through Entertainment',
    body: 'Original live action TV, animated series, podcasts, and masterclasses — built with family at the center.',
  },
  {
    title: 'Build Our Brotherhood',
    body: 'Membership, social forums, and community spaces for dads to explore parenting, hobbies, career, and life.',
  },
  {
    title: 'Curate Memorable Experiences',
    body: "National Park excursions, classic ballpark tours, retreats — there's no substitute for the memories we create together.",
  },
];

export default function ManifestoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="membership" ref={ref} className="bg-doty-green pt-20 md:pt-32 pb-10 md:pb-16">
      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">

          {/* Left */}
          <div className="md:col-span-5">
            <span className="font-body text-doty-orange text-xs tracking-[0.2em] uppercase block mb-4">The Movement</span>
            <h2 className="font-display text-doty-gold text-4xl md:text-5xl font-bold leading-tight mb-8">
              What We're<br />Building
            </h2>

            <div className="flex flex-col gap-1 w-32 mb-8">
              <div className="h-[4px] bg-doty-green border border-white/20" />
              <div className="h-[4px] bg-doty-gold" />
              <div className="h-[4px] bg-doty-orange" />
            </div>

            <blockquote className="border-l-4 border-doty-orange pl-6 mb-8">
              <p className="font-display text-white text-xl md:text-2xl italic leading-relaxed">
                "In 20 years, the only ones who will remember you worked late are your kids."
              </p>
            </blockquote>

            <p className="font-body text-white/60 leading-relaxed">
              Don't let this precious time slip away. Don't look back wishing you'd been there more, taken that trip, or started that hobby together.
            </p>
          </div>

          {/* Right — Pillars */}
          <div className="md:col-span-7 flex flex-col gap-6">
            {PILLARS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="border border-white/10 p-7 hover:border-doty-orange/60 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-[3px] bg-doty-orange" />
                  <h3 className="font-body text-doty-orange text-xs tracking-[0.2em] uppercase">{`0${i + 1}`}</h3>
                </div>
                <h4 className="font-display text-white text-xl font-bold mb-2">{p.title}</h4>
                <p className="font-body text-white/60 leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}