import { useState, useEffect } from 'react';
import api from '../../../api/client';

export default function Stats() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    api.get('/stats').then((res) => setStats(res.data || []));
  }, []);

  if (!stats.length) return null;

  return (
    <section id="stats" className="relative py-10 sm:py-14">
      <div className="container-custom relative">
        <div className="card border-2 border-ink/70 shadow-card p-0">
          <div className="flex items-center justify-between px-4 py-2.5 bg-surface-900 border-b-2 border-ink/70 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
            <span className="flex items-center gap-2"><span className="w-2 h-2 bg-primary-500 rotate-45" /> Measurement Notes</span>
            <span className="text-ink-faint">REF. MOH-02</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-y-2 sm:divide-y-0 divide-ink/15">
            {stats.map((stat, i) => (
              <div key={stat.id} className="p-6 sm:p-7 relative">
                <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest text-ink-faint">S-0{i + 1}</span>
                <p className="font-mono text-xs uppercase tracking-wider text-ink-faint truncate mb-2 pt-2">
                  {stat.label}
                </p>
                <p className="font-display text-3xl sm:text-4xl font-extrabold text-ink">
                  {stat.value}
                  {stat.suffix && <span className="text-primary-600 text-xl font-bold ml-1">{stat.suffix}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}