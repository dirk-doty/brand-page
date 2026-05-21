import { useEffect, useRef, useState } from 'react';
import DotyLogo from './DotyLogo';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 500);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-doty-green">
      {/* Orange border frame */}
      <div className="absolute inset-0 z-20 pointer-events-none border-[6px] border-doty-orange" />

      {/* Video Background */}
      <div className="absolute inset-0">
        <iframe
          src="https://player.vimeo.com/video/1140571022?h=b8720061dc&background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0"
          className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2"
          frameBorder="0"
          allow="autoplay; fullscreen"
          title="Dad of the Year" />
        
        {/* Dark teal overlay matching brand */}
        <div className="absolute inset-0 bg-doty-green/60" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6" style={{ opacity }}>




        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4">
          
          <a
            href="#sponsorships" className="bg-doty-orange text-white font-body text-sm tracking-[0.15em] uppercase px-8 py-4 hover:bg-white hover:text-doty-green transition-all duration-300">BECOME A SPONSOR



          </a>
          <a
            href="#shows" className="border border-white/40 text-white font-body text-sm tracking-[0.15em] uppercase px-8 py-4 hover:bg-white/10 transition-all duration-300">SEE OUR SLATE



          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity }}>
        
        





        
      </motion.div>
    </section>);

}