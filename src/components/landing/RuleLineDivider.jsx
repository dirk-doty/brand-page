export default function RuleLineDivider({ label, dark = false }) {
  return (
    <div className={`flex items-center gap-4 px-6 md:px-16 py-3 ${dark ? 'bg-doty-green' : 'bg-doty-cream'}`}>
      <div className={`flex-1 h-[1px] ${dark ? 'bg-white/10' : 'bg-doty-green/15'}`} />
      {label && (
        <span className={`font-body text-[10px] tracking-[0.2em] uppercase ${dark ? 'text-white/30' : 'text-doty-green/40'}`}>
          {label}
        </span>
      )}
      <div className={`flex-1 h-[1px] ${dark ? 'bg-white/10' : 'bg-doty-green/15'}`} />
    </div>
  );
}