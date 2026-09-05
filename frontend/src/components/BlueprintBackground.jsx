import { useId } from 'react';

const INK = '#1b1a15';
const ORANGE = '#ff5a16';

const VARIANTS = {
  hero: { transform: '', quiet: false },
  flip: { transform: 'scale(-1 1) translate(-1200 0)', quiet: false },
  alt: { transform: 'scale(1 -1) translate(0 -800)', quiet: false },
  flip180: { transform: 'scale(-1 -1) translate(-1200 -800)', quiet: false },
  quiet: { transform: '', quiet: true },
};

const CSS = `
  .bp-cw { animation: bp-fade 5s ease-in-out infinite; }
  .bp-cw2 { animation: bp-fade 7s ease-in-out 1.2s infinite; }
  .bp-spin { transform-box: fill-box; transform-origin: center; animation: bp-spin 46s linear infinite; }
  .bp-spin-rev { transform-box: fill-box; transform-origin: center; animation: bp-spin 32s linear infinite reverse; }
  .bp-float { animation: bp-float 9s ease-in-out infinite; }
  .bp-glow-a { animation: bp-glow 11s ease-in-out infinite; }
  .bp-glow-b { animation: bp-glow 13s ease-in-out 2s infinite; }
  .bp-beam { animation: bp-beam 12s ease-in-out infinite; }
  .bp-dots { animation: bp-drift 46s linear infinite; }
  .bp-flow { stroke-dasharray: 5 15; animation: bp-dash 1.4s linear infinite; }
  @keyframes bp-fade { 0%, 100% { opacity: 0.35; } 50% { opacity: 0.85; } }
  @keyframes bp-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes bp-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
  @keyframes bp-glow { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.95; } }
  @keyframes bp-dash { to { stroke-dashoffset: -20; } }
  @keyframes bp-drift { from { background-position: 0 0; } to { background-position: 56px 56px; } }
  @keyframes bp-beam {
    0% { transform: translateX(-60%) rotate(-18deg); opacity: 0; }
    12% { opacity: 0.13; }
    88% { opacity: 0.13; }
    100% { transform: translateX(60%) rotate(-18deg); opacity: 0; }
  }
`;

function Cross({ x, y, r = 6, color = ORANGE, opacity = 0.7, className = 'bp-cw' }) {
  return (
    <g className={className} style={{ opacity }}>
      <line x1={x - r} y1={y} x2={x + r} y2={y} stroke={color} strokeWidth="1" />
      <line x1={x} y1={y - r} x2={x} y2={y + r} stroke={color} strokeWidth="1" />
      <circle cx={x} cy={y} r={1.2} fill={color} />
    </g>
  );
}

function LCorner({ x, y, len = 14, color = INK, opacity = 0.5 }) {
  return (
    <g stroke={color} strokeWidth="1.4" fill="none" style={{ opacity }}>
      <path d={`M${x} ${y + len} L${x} ${y} L${x + len} ${y}`} />
    </g>
  );
}

export default function BlueprintBackground({ variant = 'hero', fixed = false }) {
  const uid = useId().replace(/[:]/g, 'x');
  const cfg = VARIANTS[variant] || VARIANTS.hero;
  const quiet = cfg.quiet;

  const glowA = (
    <>
      <div
        className="bp-glow-a absolute -bottom-48 -right-48 w-[560px] h-[560px]"
        style={{ background: 'radial-gradient(circle, rgba(255,90,22,0.15), rgba(255,90,22,0.05) 45%, transparent 70%)' }}
      />
      <div
        className="absolute -top-56 -right-56 w-[520px] h-[520px]"
        style={{ background: 'radial-gradient(circle, rgba(255,90,22,0.10), rgba(255,90,22,0.03) 45%, transparent 72%)' }}
      />
    </>
  );
  const glowB = (
    <div
      className="bp-glow-b absolute -bottom-64 -left-64 w-[640px] h-[640px]"
      style={{ background: 'radial-gradient(circle, rgba(255,90,22,0.12), rgba(255,90,22,0.04) 45%, transparent 70%)' }}
    />
  );

  return (
    <div className={`${fixed ? 'fixed' : 'absolute'} inset-0 overflow-hidden pointer-events-none select-none`} aria-hidden="true">
      <style>{CSS}</style>

      {glowB}
      {glowA}

      <div
        className="bp-beam absolute top-0 bottom-0 w-[46%] left-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,90,22,0.09) 50%, transparent)',
        }}
      />

      <div
        className="bp-dots absolute top-4 left-1/2 -translate-x-1/2 w-[320px] h-[120px] sm:w-[480px]"
        style={{
          backgroundImage: 'radial-gradient(rgba(27,26,21,0.20) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <g transform={cfg.transform}>
          <defs>
            <pattern id={`${uid}_tick-h`} width="48" height="12" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="12" stroke={INK} strokeOpacity="0.16" />
            </pattern>
            <pattern id={`${uid}_tick-v`} width="12" height="48" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="12" y2="0" stroke={INK} strokeOpacity="0.14" />
            </pattern>
          </defs>

          <rect x="0" y="0" width="1200" height="12" fill={`url(#${uid}_tick-h)`} />
          <rect x="0" y="788" width="1200" height="12" fill={`url(#${uid}_tick-h)`} />
          <rect x="0" y="0" width="12" height="800" fill={`url(#${uid}_tick-v)`} />
          <rect x="1188" y="0" width="12" height="800" fill={`url(#${uid}_tick-v)`} opacity="0.7" />

          <LCorner x={26} y={26} />
          <LCorner x={1160} y={26} />
          <LCorner x={26} y={760} />
          <LCorner x={1160} y={760} />
          <LCorner x={600} y={48} len={18} color="#9a9a8a" opacity={0.5} />

          <g stroke={INK} fill="none" opacity="0.05" strokeWidth="1">
            <line x1="600" y1="0" x2="600" y2="800" strokeDasharray="4 10" />
            <line x1="0" y1="400" x2="1200" y2="400" />
            <line x1="0" y1="240" x2="400" y2="0" />
            <line x1="900" y1="800" x2="1200" y2="400" />
          </g>
          <g stroke={INK} opacity="0.045" strokeWidth="0.8" fill="none">
            <line x1="0" y1="620" x2="820" y2="0" />
            <line x1="300" y1="800" x2="1200" y2="80" />
            <line x1="1100" y1="0" x2="1200" y2="120" />
          </g>
          <line x1="300" y1="800" x2="1200" y2="80" stroke={ORANGE} opacity="0.06" strokeWidth="1" />

          {quiet ? (
            <g>
              <Cross x={180} y={56} r={6} />
              <Cross x={600} y={784} r={6} className="bp-cw2" />
              <Cross x={1020} y={742} r={6} className="bp-cw2" />
              <g stroke={ORANGE} strokeOpacity="0.35" strokeWidth="0.9" fill="none">
                <circle cx={600} cy={56} r={9} strokeDasharray="2 6" />
                <line x1={588} y1={56} x2={612} y2={56} />
                <line x1={600} y1={44} x2={600} y2={68} />
              </g>
            </g>
          ) : (
            <g>
              <Cross x={210} y={56} r={7} />
              <Cross x={990} y={56} r={7} className="bp-cw2" />
              <Cross x={66} y={560} r={6} className="bp-cw2" />
              <Cross x={1134} y={560} r={6} />
              <Cross x={600} y={784} r={6} className="bp-cw2" />
              <g stroke={ORANGE} strokeOpacity="0.5" strokeWidth="0.9" fill="none">
                <circle cx={1134} cy={620} r={10} />
                <circle cx={1134} cy={620} r={16} strokeDasharray="2 6" />
                <line x1={1122} y1={620} x2={1146} y2={620} />
                <line x1={1134} y1={608} x2={1134} y2={632} />
                <circle cx={66} cy={620} r={10} className="bp-cw2" />
              </g>

              <g className="bp-float" stroke={ORANGE} fill={ORANGE} fillOpacity="0.045" strokeOpacity="0.3" strokeWidth="1">
                <rect x="44" y="540" width="120" height="120" transform="rotate(8 44 540)" />
                <rect x="1040" y="460" width="80" height="80" transform="rotate(-6 1040 460)" opacity="0.7" />
              </g>
              <path
                d="M1200 320 A 560 560 0 0 0 640 0"
                fill="none"
                stroke={ORANGE}
                strokeOpacity="0.10"
                strokeWidth="22"
              />
              <path d="M0 780 A 220 220 0 0 0 180 800" fill="none" stroke={ORANGE} strokeOpacity="0.12" strokeWidth="2" />
              <rect x="18" y="612" width="3" height="170" fill={ORANGE} fillOpacity="0.4" />

              <g stroke={INK} strokeOpacity="0.22" strokeWidth="0.8" fill="none" strokeDasharray="2 6">
                <line x1="84" y1="700" x2="84" y2="770" />
                <line x1="336" y1="700" x2="336" y2="770" />
              </g>
              <g stroke={ORANGE} strokeOpacity="0.75" strokeWidth="1.4" fill="none">
                <line x1="84" y1="752" x2="336" y2="752" />
                <path d="M84 746 L70 752 L84 758" fill={ORANGE} fillOpacity="0.8" stroke="none" />
                <path d="M336 746 L350 752 L336 758" fill={ORANGE} fillOpacity="0.8" stroke="none" />
              </g>

              <g stroke={INK} strokeOpacity="0.22" strokeWidth="0.8" fill="none" strokeDasharray="2 6">
                <line x1="40" y1="76" x2="120" y2="76" />
                <line x1="40" y1="260" x2="120" y2="260" />
              </g>
              <g stroke={ORANGE} strokeOpacity="0.6" strokeWidth="1.4" fill="none">
                <line x1="52" y1="76" x2="52" y2="260" />
                <path d="M46 76 L52 62 L58 76" fill={ORANGE} fillOpacity="0.7" stroke="none" />
                <path d="M46 260 L52 274 L58 260" fill={ORANGE} fillOpacity="0.7" stroke="none" />
              </g>

              <g stroke={ORANGE} strokeOpacity="0.45" strokeWidth="1">
                <line className="bp-flow" x1="64" y1="432" x2="432" y2="432" />
                <line x1="64" y1="432" x2="432" y2="432" opacity="0.18" />
              </g>

              <g className="bp-spin">
                <g stroke={ORANGE} strokeOpacity="0.3" strokeWidth="1" fill="none">
                  <circle cx="1000" cy="655" r="80" />
                  <circle cx="1000" cy="655" r="54" />
                  <circle cx="1000" cy="655" r="28" />
                  <ellipse cx="1000" cy="655" rx="80" ry="30" />
                  <ellipse cx="1000" cy="655" rx="30" ry="80" />
                </g>
                <g transform="rotate(35 1000 655)">
                  <circle cx="1000" cy="655" r="80" fill="none" stroke={ORANGE} strokeOpacity="0.18" strokeWidth="0.9" />
                  <ellipse cx="1000" cy="655" rx="80" ry="28" fill="none" stroke={ORANGE} strokeOpacity="0.14" strokeWidth="0.8" />
                </g>
                <g transform="rotate(-55 1000 655)">
                  <ellipse cx="1000" cy="655" rx="80" ry="28" fill="none" stroke={ORANGE} strokeOpacity="0.14" strokeWidth="0.8" />
                </g>
                {[1000 - 80, 1000 + 80, 655 - 80, 655 + 80].map((c, i) => (
                  <g key={i} stroke={ORANGE} strokeOpacity="0.5" strokeWidth="0.8">
                    {i < 2 ? (
                      <line x1={c - 5} y1={655} x2={c + 5} y2={655} />
                    ) : (
                      <line x1={1000} y1={c - 9} x2={1000} y2={c + 9} />
                    )}
                  </g>
                ))}
                <circle cx={1000} cy={655} r={2.5} fill={ORANGE} fillOpacity="0.7" />
              </g>
              <g className="bp-spin-rev" stroke={ORANGE} strokeOpacity="0.12" strokeWidth="0.8" fill="none">
                <ellipse cx="1000" cy="655" rx="82" ry="30" />
                <ellipse cx="1000" cy="655" rx="30" ry="82" />
              </g>

              <g className="bp-spin" stroke={ORANGE} strokeOpacity="0.10" strokeWidth="0.9" fill="none">
                <circle cx="-140" cy="-120" r="230" />
                <circle cx="-140" cy="-120" r="300" strokeDasharray="3 9" />
              </g>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}