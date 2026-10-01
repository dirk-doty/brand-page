import { useEffect } from 'react';
import Navbar from '../landing/Navbar';
import SiteFooter from '../landing/SiteFooter';

export function LegalSection({ id, title, children }) {
  return (
    <section id={id} className="mb-10 scroll-mt-28">
      <h2 className="font-display text-doty-green text-xl md:text-2xl font-bold mb-3">{title}</h2>
      <div className="font-body text-doty-green/80 leading-relaxed space-y-4 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-doty-green [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}

export default function LegalLayout({ title, effectiveDate, children }) {
  // The page renders after the browser's own hash scroll, so honour links like /terms#dispute-resolution here.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <div className="min-h-screen bg-doty-cream">
      <Navbar solid />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <div className="max-w-3xl mx-auto px-6 pt-36 md:pt-40 pb-20">
          <div className="flex flex-col gap-1 w-32 mb-10">
            <div className="h-[4px] bg-doty-green" />
            <div className="h-[4px] bg-doty-gold" />
            <div className="h-[4px] bg-doty-orange" />
          </div>
          <h1 className="font-display text-doty-green text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="font-body text-doty-green/70 text-sm mb-12">Effective date: {effectiveDate}</p>
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
