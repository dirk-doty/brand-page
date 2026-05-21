import { useState, useEffect } from 'react';
import DotyLogo from './DotyLogo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-doty-green/97 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`
      }>
      
      {/* Orange top border */}
      <div className="h-1 bg-doty-orange w-full" />
      
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Left nav */}
        <div className="flex-1 flex items-center gap-6 hidden md:flex">
          <a href="#join" className="font-body text-[11px] tracking-[0.15em] uppercase text-white/70 hover:text-doty-orange transition-colors">
            Join
          </a>
          <a href="#mission" className="font-body text-[11px] tracking-[0.15em] uppercase text-white/70 hover:text-doty-orange transition-colors">
            Mission
          </a>
        </div>

        {/* Logo */}
        <a href="https://doty.media" className="flex items-center justify-center">
          <img
            src="https://media.base44.com/images/public/69c16483a7b91a894b0cd8c7/14350f243_DOTY_Primary-Logo_1-C_Dark-Pine.png"
            alt="Dad of the Year"
            width={120}
            style={{ filter: 'brightness(0) invert(1)' }} />
        </a>

        {/* Right nav */}
        <div className="flex-1 flex items-center justify-end gap-6 hidden md:flex">
          <a href="#shows" className="font-body text-[11px] tracking-[0.15em] uppercase text-white/70 hover:text-doty-orange transition-colors">DOTY SHOWS

          </a>
          <a
            href="#sponsorships" className="bg-doty-orange text-white font-body text-[11px] tracking-[0.15em] uppercase px-4 py-2 hover:bg-doty-orange/80 transition-colors">BRAND SPONSORSHIPS



          </a>
        </div>

        {/* Mobile logo only right side */}
        <a href="#join" className="md:hidden bg-doty-orange text-white font-body text-[10px] tracking-[0.1em] uppercase px-3 py-1.5">
          Join
        </a>
      </div>
    </nav>);

}