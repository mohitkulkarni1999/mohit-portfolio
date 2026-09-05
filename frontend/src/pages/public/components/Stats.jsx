import { useState, useEffect } from 'react';
import api from '../../../api/client';
import Icon from '../../../components/Icon';

export default function Stats() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    api.get('/stats').then((res) => setStats(res.data || []));
  }, []);

  if (!stats.length) return null;

  return (
    <section id="stats" className="py-14">
      <div className="container-custom">
        <div className="card p-8 sm:p-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={stat.id} className="text-center animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <span className="mx-auto mb-3 w-12 h-12 rounded-2xl bg-primary-500/10 text-primary-400 flex items-center justify-center">
                <Icon name={stat.icon} size={22} />
              </span>
              <p className="font-display text-4xl font-bold text-white">
                {stat.value}<span className="text-primary-400">{stat.suffix}</span>
              </p>
              <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
