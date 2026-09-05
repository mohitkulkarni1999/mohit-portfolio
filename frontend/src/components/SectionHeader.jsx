export default function SectionHeader({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={center ? 'text-center' : 'text-left'}>
      {eyebrow && (
        <p className="section-eyebrow justify-center">
          <span className="inline-block w-4 h-px bg-primary-600" aria-hidden />
          <span className="mx-1">♦</span>
          <span className="text-primary-600">{eyebrow}</span>
          <span className="mx-1">♦</span>
          <span className="inline-block w-4 h-px bg-primary-600" aria-hidden />
        </p>
      )}
      <h2 className="section-title">{title}</h2>
      <div className="mt-4 flex items-center gap-2 justify-center" aria-hidden>
        <span className="inline-block w-1 h-1 bg-primary-600 rotate-45" />
        <span className="inline-block h-[3px] w-24 bg-primary-500" />
        <span className="inline-block w-1 h-1 bg-primary-600 rotate-45" />
      </div>
      {subtitle && (
        <p className={`section-subtitle ${center ? 'mx-auto text-center' : ''}`}>{subtitle}</p>
      )}
    </div>
  );
}