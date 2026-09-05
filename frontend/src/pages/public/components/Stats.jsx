import { useState, useEffect } from 'react';
import api from '../../../api/client';

export default function Stats() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    api.get('/stats').then((res) => setStats(res.data || []));
  }, []);

  if (!stats.length) return null;

  return (
    <section id="stats" className="py-14">
      <div className="container-custom">
        <div className="card overflow-hidden p-0 shadow-glow">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-900/90 border-b border-surface-700/60">
            <span className="terminal-dots">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </span>
            <span className="ml-3 text-xs text-slate-500 font-mono">mohit@portfolio: ~/stats</span>
            <span className="ml-auto text-xs text-slate-600 font-mono">neofetch</span>
          </div>

          <div className="p-6 sm:p-8 font-mono">
            <p className="text-sm text-slate-500 mb-5">
              <span className="text-primary-400">$</span> ./system_stats.sh
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6">
              {stats.map((stat, i) => (
                <div key={stat.id} className="animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <p className="text-xs text-slate-500 truncate mb-1">
                    <span className="text-surface-700">·</span> {stat.label.toLowerCase()}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    <span className="text-primary-400">{stat.value}</span>
                    {stat.suffix && <span className="text-amber-400 text-base ml-1">{stat.suffix}</span>}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}