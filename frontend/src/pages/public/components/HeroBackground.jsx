const INK = '#1b1a15';
const ORANGE = '#ff5a16';

const CSS = `
  .hb-cw { animation: hb-fade 5s ease-in-out infinite; }
  .hb-cw2 { animation: hb-fade 7s ease-in-out 1.2s infinite; }
  .hb-spin { transform-box: fill-box; transform-origin: center; animation: hb-spin 46s linear infinite; }
  .hb-spin-rev { transform-box: fill-box; transform-origin: center; animation: hb-spin 32s linear infinite reverse; }
  .hb-float { animation: hb-float 9s ease-in-out infinite; }
  .hb-glow-br { animation: hb-glow 11s ease-in-out infinite; }
  .hb-glow-bl { animation: hb-glow 13s ease-in-out 2s infinite; }
  .hb-beam { animation: hb-beam 9s ease-in-out infinite; }
  .hb-dots { animation: hb-drift 40s linear infinite; }
  .hb-flow { stroke-dasharray: 5 15; animation: hb-dash 1.4s linear infinite; }
  @keyframes hb-fade { 0%, 100% { opacity: 0.35; } 50% { opacity: 0.85; } }
  @keyframes hb-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes hb-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
  @keyframes hb-glow { 0%, 100% { opacity: 0.45; } 50% { opacity: 1; } }
  @keyframes hb-dash { to { stroke-dashoffset: -20; } }
  @keyframes hb-drift { from { background-position: 0 0; } to { background-position: 56px 56px; } }
  @keyframes hb-beam {
    0% { transform: translateX(-60%) rotate(-18deg); opacity: 0; }
    12% { opacity: 0.16; }
    88% { opacity: 0.16; }
    100% { transform: translateX(60%) rotate(-18deg); opacity: 0; }
  }
`;

function Cross({ x, y, r = 6, color = ORANGE, opacity = 0.7, className = 'hb-cw' }) {
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

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <style>{CSS}</style>

      {/* soft corner glows */}
      <div
        className="hb-glow-br absolute -bottom-48 -right-48 w-[560px] h-[560px]"
        style={{ background: 'radial-gradient(circle, rgba(255,90,22,0.16), rgba(255,90,22,0.05) 45%, transparent 70%)' }}
      />
      <div
        className="hb-glow-bl absolute -bottom-64 -left-64 w-[640px] h-[640px]"
        style={{ background: 'radial-gradient(circle, rgba(255,90,22,0.13), rgba(255,90,22,0.04) 45%, transparent 70%)' }}
      />
      <div
        className="absolute -top-56 -right-56 w-[520px] h-[520px]"
        style={{ background: 'radial-gradient(circle, rgba(255,90,22,0.12), rgba(255,90,22,0.03) 45%, transparent 72%)' }}
      />

      {/* sweeping drafting beam */}
      <div
        className="hb-beam absolute top-0 bottom-0 w-[46%] left-0"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,90,22,0.10) 50%, transparent)',
        }}
      />

      {/* dotted grid patch */}
      <div
        className="hb-dots absolute top-6 left-1/2 -translate-x-1/2 w-[420px] h-[150px] sm:w-[560px]"
        style={{
          backgroundImage: 'radial-gradient(rgba(27,26,21,0.22) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        {/* faint construction lines */}
        <g stroke={INK} fill="none" opacity="0.05" strokeWidth="1">
          <line x1="600" y1="0" x2="600" y2="800" strokeDasharray="4 10" />
          <line x1="0" y1="400" x2="1200" y2="400" />
          <line x1="0" y1="240" x2="400" y2="0" />
          <line x1="900" y1="800" x2="1200" y2="400" />
        </g>

        {/* faint diagonal projection lines */}
        <g stroke={INK} opacity="0.045" strokeWidth="0.8" fill="none">
          <line x1="0" y1="620" x2="820" y2="0" />
          <line x1="300" y1="800" x2="1200" y2="80" />
          <line x1="1100" y1="0" x2="1200" y2="120" />
        </g>
        <line x1="300" y1="800" x2="1200" y2="80" stroke={ORANGE} opacity="0.06" strokeWidth="1" />

        {/* edge ruler ticks */}
        <defs>
          <pattern id="hb-tick-h" width="48" height="12" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="12" stroke={INK} strokeOpacity="0.18" />
          </pattern>
          <pattern id="hb-tick-v" width="12" height="48" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="12" y2="0" stroke={INK} strokeOpacity="0.16" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="1200" height="12" fill="url(#hb-tick-h)" />
        <rect x="0" y="788" width="1200" height="12" fill="url(#hb-tick-h)" />
        <rect x="0" y="0" width="12" height="800" fill="url(#hb-tick-v)" />
        <rect x="1188" y="0" width="12" height="800" fill="url(#hb-tick-v)" opacity="0.7" />

        {/* corner drafting brackets */}
        <LCorner x={26} y={26} />
        <LCorner x={1160} y={26} />
        <LCorner x={26} y={760} />
        <LCorner x={1160} y={760} />
        <LCorner x={600} y={48} len={18} color="#9a9a8a" opacity={0.5} />

        {/* translucent orange shapes */}
        <g
          className="hb-float"
          stroke={ORANGE}
          fill={ORANGE}
          fillOpacity="0.045"
          strokeOpacity="0.3"
          strokeWidth="1"
        >
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
        <path
          d="M0 780 A 220 220 0 0 0 180 800"
          fill="none"
          stroke={ORANGE}
          strokeOpacity="0.12"
          strokeWidth="2"
        />
        <rect x="18" y="612" width="3" height="170" fill={ORANGE} fillOpacity="0.4" />

        {/* dimension bar bottom-left */}
        <g stroke={INK} strokeOpacity="0.22" strokeWidth="0.8" fill="none" strokeDasharray="2 6">
          <line x1="84" y1="700" x2="84" y2="770" />
          <line x1="336" y1="700" x2="336" y2="770" />
        </g>
        <g stroke={ORANGE} strokeOpacity="0.75" strokeWidth="1.4" fill="none">
          <line x1="84" y1="752" x2="336" y2="752" />
          <path d="M84 746 L70 752 L84 758" fill={ORANGE} fillOpacity="0.8" stroke="none" />
          <path d="M336 746 L350 752 L336 758" fill={ORANGE} fillOpacity="0.8" stroke="none" />
        </g>

        {/* dimension bar left */}
        <g stroke={INK} strokeOpacity="0.22" strokeWidth="0.8" fill="none" strokeDasharray="2 6">
          <line x1="40" y1="76" x2="120" y2="76" />
          <line x1="40" y1="260" x2="120" y2="260" />
        </g>
        <g stroke={ORANGE} strokeOpacity="0.6" strokeWidth="1.4" fill="none">
          <line x1="52" y1="76" x2="52" y2="260" />
          <path d="M46 76 L52 62 L58 76" fill={ORANGE} fillOpacity="0.7" stroke="none" />
          <path d="M46 260 L52 274 L58 260" fill={ORANGE} fillOpacity="0.7" stroke="none" />
        </g>

        {/* flowing accent rule left */}
        <g stroke={ORANGE} strokeOpacity="0.45" strokeWidth="1">
          <line className="hb-flow" x1="64" y1="432" x2="432" y2="432" />
          <line x1="64" y1="432" x2="432" y2="432" opacity="0.18" />
        </g>

        {/* crosshairs / registration marks */}
        <Cross x={210} y={56} r={7} />
        <Cross x={990} y={56} r={7} className="hb-cw2" />
        <Cross x={66} y={560} r={6} className="hb-cw2" />
        <Cross x={1134} y={560} r={6} />
        <Cross x={600} y={784} r={6} className="hb-cw2" />
        <g stroke={ORANGE} strokeOpacity="0.5" strokeWidth="0.9" fill="none">
          <circle cx={1134} cy={620} r={10} />
          <circle cx={1134} cy={620} r={16} strokeDasharray="2 6" />
          <line x1={1122} y1={620} x2={1146} y2={620} />
          <line x1={1134} y1={608} x2={1134} y2={632} />
          <circle cx={66} cy={620} r={10} className="hb-cw2" />
        </g>

        {/* wireframe globe — bottom right */}
        <g className="hb-spin">
          <g stroke={ORANGE} strokeOpacity="0.3" strokeWidth="1" fill="none">
            <circle cx="1030" cy="690" r="150" />
            <circle cx="1030" cy="690" r="102" />
            <circle cx="1030" cy="690" r="54" />
            <ellipse cx="1030" cy="690" rx="150" ry="56" />
            <ellipse cx="1030" cy="690" rx="56" ry="150" />
          </g>
          <g transform="rotate(35 1030 690)">
            <circle cx="1030" cy="690" r="150" fill="none" stroke={ORANGE} strokeOpacity="0.18" strokeWidth="0.9" />
            <ellipse cx="1030" cy="690" rx="150" ry="52" fill="none" stroke={ORANGE} strokeOpacity="0.14" strokeWidth="0.8" />
          </g>
          <g transform="rotate(-55 1030 690)">
            <ellipse cx="1030" cy="690" rx="150" ry="52" fill="none" stroke={ORANGE} strokeOpacity="0.14" strokeWidth="0.8" />
          </g>
          {[1030 - 150, 1030 + 150, 690 - 150, 690 + 150].map((c, i) => (
            <g key={i} stroke={ORANGE} strokeOpacity="0.5" strokeWidth="0.8">
              {i < 2 ? (
                <line x1={c - 5} y1={690} x2={c + 5} y2={690} />
              ) : (
                <line x1={1030} y1={c - 9} x2={1030} y2={c + 9} />
              )}
            </g>
          ))}
          <circle cx={1030} cy={690} r={2.5} fill={ORANGE} fillOpacity="0.7" />
        </g>
        <g className="hb-spin-rev" stroke={ORANGE} strokeOpacity="0.12" strokeWidth="0.8" fill="none">
          <ellipse cx="1030" cy="690" rx="190" ry="70" />
          <ellipse cx="1030" cy="690" rx="70" ry="190" />
        </g>

        {/* far top-left orbit arcs */}
        <g className="hb-spin" stroke={ORANGE} strokeOpacity="0.10" strokeWidth="0.9" fill="none">
          <circle cx="-140" cy="-120" r="230" />
          <circle cx="-140" cy="-120" r="300" strokeDasharray="3 9" />
        </g>
      </svg>
    </div>
  );
}