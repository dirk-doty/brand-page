import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PRODUCTS = [
  {
    name: 'The Heritage Tee',
    detail: '220gsm · 100% Organic Cotton · Garment Dyed',
    image: 'https://media.base44.com/images/public/69c16483a7b91a894b0cd8c7/1a390c2e4_generated_c2da3ded.png',
    number: '001',
  },
  {
    name: 'The Field Cap',
    detail: 'Waxed Canvas · Brass Hardware · Adjustable',
    image: 'https://media.base44.com/images/public/69c16483a7b91a894b0cd8c7/1c41385ec_generated_e32b3c4e.png',
    number: '002',
  },
  {
    name: 'The Expedition Pack',
    detail: 'Ripstop Nylon · 32L · Water Resistant',
    image: 'https://media.base44.com/images/public/69c16483a7b91a894b0cd8c7/7bc893d29_generated_d5b11a6e.png',
    number: '003',
  },
  {
    name: 'The Trail Vest',
    detail: 'Recycled Down · 700 Fill · Packable',
    image: 'https://media.base44.com/images/public/69c16483a7b91a894b0cd8c7/c749a91a8_generated_08e95227.png',
    number: '004',
  },
];

export default function ProductGallery() {
  const scrollRef = useRef(null);
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: true, margin: '-100px' });

  return (
    <section className="py-20 md:py-32 bg-background" ref={inViewRef}>
      <div className="px-6 md:px-[8vw] mb-12">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#5E5C59] block mb-3">
              The Uniform
            </span>
            <h2 className="font-display text-[8vw] md:text-[4vw] font-bold text-[#121212] leading-[0.9]">
              Tools for<br />the Trade
            </h2>
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#5E5C59] hidden md:block">
            004 Pieces
          </span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto px-6 md:px-[8vw] pb-8 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {PRODUCTS.map((product, i) => (
          <motion.div
            key={product.number}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="group flex-shrink-0 w-[75vw] md:w-[30vw] snap-start"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#121212]/5 mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#121212]/0 group-hover:bg-[#121212]/20 transition-all duration-500" />
              
              {/* Hover detail overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-mono text-[11px] tracking-[0.05em] text-[#F9F7F2]/80 leading-relaxed">
                  {product.detail}
                </p>
              </div>
            </div>
            
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-body text-sm font-medium text-[#121212] tracking-tight">
                  {product.name}
                </h3>
              </div>
              <span className="font-mono text-[10px] text-[#5E5C59] tracking-[0.1em]">
                Nº{product.number}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}