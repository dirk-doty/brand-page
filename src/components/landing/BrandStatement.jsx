import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { number: '75M+', label: 'Dads in the U.S.' },
  { number: '66%', label: 'Feel isolated & alone' },
  { number: '56%', label: 'Feel guilty about time away from their kids' },
  { number: '50%', label: 'Actively seek parenting resources' },
];

export default function BrandStatement() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="mission" ref={ref} className="bg-doty-cream py-12 md:py-20">
      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        {/* Three stripe divider */}
        <div className="flex flex-col gap-1 mb-16 w-40">
          <div className="h-[4px] bg-doty-green" />
          <div className="h-[4px] bg-doty-gold" />
          <div className="h-[4px] bg-doty-orange" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="font-body text-doty-orange-dark text-xs tracking-[0.2em] uppercase block mb-4">Our Mission</span>
            <h2 className="font-display text-doty-green text-4xl md:text-5xl font-bold leading-tight mb-6">
              More Than a<br />Media Brand.
            </h2>
            <p className="font-body text-doty-green/80 text-lg leading-relaxed mb-6">
              DOTY is a movement dedicated to uplifting modern fatherhood. From every dad's daily struggles to the caregiver's nurturing role — we empower dads to find inspiration, strength, and playful creativity in raising their families.
            </p>
            <p className="font-body text-doty-green/80 text-lg leading-relaxed">
              Through original entertainment, community, and curated experiences — we envision a future where fatherhood is a celebrated, supported, and trusted central pillar of family life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 self-start"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className={`aspect-square flex flex-col justify-center p-6 ${i === 0 ? 'bg-doty-orange-button' : i === 1 ? 'bg-doty-green' : i === 2 ? 'bg-doty-green' : 'bg-doty-gold'}`}
              >
                <div className={`font-display font-bold text-4xl md:text-5xl mb-2 ${i === 0 || i === 3 ? 'text-doty-green' : 'text-white'}`}>
                  {stat.number}
                </div>
                <div className={`font-body text-sm leading-snug ${i === 3 ? 'text-doty-green/80' : i === 0 ? 'text-doty-green' : 'text-white/80'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}