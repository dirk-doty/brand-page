import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const IMAGES = [
  {
    url: '/images/gallery-1.jpg',
    label: 'On Set',
  },
  {
    url: '/images/gallery-2.jpg',
    label: 'Production',
  },
  {
    url: '/images/gallery-3.jpg',
    label: 'National Parks Hunt',
  },
];

export default function GalleryStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-doty-cream py-0 overflow-hidden">
      <div className="grid grid-cols-3">
        {IMAGES.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            className="relative aspect-square overflow-hidden group"
          >
            <img
              src={img.url}
              alt={img.label}
              className="w-full h-full object-cover brightness-90 group-hover:scale-105 group-hover:brightness-75 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-doty-green/0 group-hover:bg-doty-green/30 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <span className="font-body text-white text-xs tracking-[0.2em] uppercase">{img.label}</span>
            </div>
            {/* Orange accent bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-doty-orange translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}