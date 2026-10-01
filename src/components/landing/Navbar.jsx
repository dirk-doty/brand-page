import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Navbar({ solid = false }) {
  const [scrolled, setScrolled] = useState(false);
  // Section anchors live on the home page; prefix them with "/" when rendered elsewhere (e.g. /privacy).
  const onHome = useLocation().pathname === '/';
  const anchor = (id) => (onHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      solid || scrolled ? 'bg-doty-green/[0.97] backdrop-blur-sm shadow-lg' : 'bg-transparent'}`
      }>
      
      {/* Orange top border */}
      <div className="h-1 bg-doty-orange w-full" />
      
      <nav aria-label="Primary" className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Left nav */}
        <div className="flex-1 flex items-center gap-6 hidden md:flex">
          <a href={anchor('join')} className="font-body text-[11px] tracking-[0.15em] uppercase text-white/70 hover:text-doty-orange transition-colors">
            Join
          </a>
          <a href={anchor('mission')} className="font-body text-[11px] tracking-[0.15em] uppercase text-white/70 hover:text-doty-orange transition-colors">
            Mission
          </a>
        </div>

        {/* Logo */}
        <a href="https://doty.media" aria-label="Dad of the Year home" className="flex items-center justify-center">
          <img
            src="/images/logo-dark.png"
            alt=""
            width={120}
            style={{ filter: 'brightness(0) invert(1)' }} />
        </a>

        {/* Right nav */}
        <div className="flex-1 flex items-center justify-end gap-6 hidden md:flex">
          <a href={anchor('shows')} className="font-body text-[11px] tracking-[0.15em] uppercase text-white/70 hover:text-doty-orange transition-colors">DOTY SHOWS

          </a>
          <a
            href={anchor('sponsorships')} className="bg-doty-orange text-white font-body text-[11px] tracking-[0.15em] uppercase px-4 py-2 hover:bg-doty-orange/80 transition-colors">BRAND SPONSORSHIPS



          </a>
        </div>

        {/* Mobile logo only right side */}
        <a href={anchor('join')} className="md:hidden bg-doty-orange text-white font-body text-[10px] tracking-[0.1em] uppercase px-3 py-1.5">
          Join
        </a>
      </nav>
    </header>);

}
