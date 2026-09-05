export default function SectionHeader({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={center ? 'text-center' : 'text-left'}>
      {eyebrow && (
        <p className="font-mono text-primary-500/80 text-sm mb-2">
          <span className="text-slate-600 pr-2">//</span>
          {eyebrow}
        </p>
      )}
      <h2 className="font-mono text-2xl sm:text-4xl font-bold text-white flex items-center justify-start gap-3 flex-wrap">
        <span className="text-primary-400 hidden sm:inline" aria-hidden>&gt;</span>
        {title}
        <span className="inline-block w-2 h-6 sm:h-8 bg-primary-400 cursor-blink" aria-hidden />
      </h2>
      {subtitle && (
        <p className={`text-slate-400 mt-4 max-w-2xl font-mono text-sm sm:text-base leading-relaxed ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}