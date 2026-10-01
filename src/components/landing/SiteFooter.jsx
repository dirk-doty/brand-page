export default function SiteFooter() {
  return (
    <footer className="bg-doty-green">
      <div className="px-6 md:px-16 max-w-7xl mx-auto pt-12 pb-8 md:pb-10">
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="opacity-40">
            <img
              src="/images/logo-dark.png"
              alt="Dad of the Year"
              width={140}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-start md:items-center">
            <span className="font-body text-white/60 text-xs tracking-widest uppercase">© 2026 Dad of the Year, LLC.</span>
            <span className="font-body text-white/60 text-xs tracking-widest uppercase">All Rights Reserved.</span>
            <a href="/terms" className="font-body text-white/60 text-xs tracking-widest uppercase hover:text-white transition-colors">Terms of Use</a>
            <a href="/privacy" className="font-body text-white/60 text-xs tracking-widest uppercase hover:text-white transition-colors">Privacy Policy</a>
            <a href="/accessibility" className="font-body text-white/60 text-xs tracking-widest uppercase hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>

      <div className="h-1.5 bg-doty-orange" />
    </footer>
  );
}
