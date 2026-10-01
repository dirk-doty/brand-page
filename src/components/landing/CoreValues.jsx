import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sunset, Users, TreePine } from 'lucide-react';

const VALUES = [
  {
    icon: Sunset,
    title: 'Masculinity is Good',
    body: 'Healthy masculinity is natural. Masculine leaders provide a positive, reassuring influence for the family unit.',
  },
  {
    icon: Users,
    title: 'Brotherhood Uplifts',
    body: "Men thrive in a supportive, positive peer group. Community raises everyone's game.",
  },
  {
    icon: TreePine,
    title: 'Get Outside!',
    body: "Nature nourishes — and it's the best teacher. Overexposure to screens is killing us and our skills.",
  },
];

export default function CoreValues() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-doty-cream py-20 md:py-28">
      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-body text-doty-orange-dark text-xs tracking-[0.2em] uppercase block mb-3">Core Values</span>
          <h2 className="font-display text-doty-green text-4xl md:text-5xl font-bold">
            Give Dads a North Star
          </h2>
        </div>

        {/* Three stripe element */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-col gap-1 w-24">
            <div className="h-[4px] bg-doty-green" />
            <div className="h-[4px] bg-doty-gold" />
            <div className="h-[4px] bg-doty-orange" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="bg-white p-8 border-t-4 border-doty-orange hover:shadow-lg transition-shadow duration-300"
            >
              <val.icon className="text-doty-orange w-8 h-8 mb-5" aria-hidden="true" focusable="false" />
              <h3 className="font-display text-doty-green text-xl font-bold mb-3">{val.title}</h3>
              <p className="font-body text-doty-green/70 leading-relaxed">{val.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}