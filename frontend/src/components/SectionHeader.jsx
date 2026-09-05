export default function SectionHeader({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={center ? 'text-center' : ''}>
      {eyebrow && <div className={`section-eyebrow ${center ? '' : 'text-center'}`}>{eyebrow}</div>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className={`section-subtitle ${center ? 'mx-auto' : ''} text-center`}>{subtitle}</p>}
    </div>
  );
}
