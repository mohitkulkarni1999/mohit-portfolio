import { useState, useEffect } from 'react';
import { FiCalendar, FiAward, FiCheckCircle } from 'react-icons/fi';
import api from '../../../api/client';
import SectionHeader from '../../../components/SectionHeader';
import Icon from '../../../components/Icon';

export default function Achievements({ settings }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/achievements').then((res) => setItems(res.data || []));
  }, []);

  if (!items.length) return null;

  return (
    <section id="achievements" className="section-pad">
      <div className="container-custom">
        <SectionHeader
          eyebrow="milestones --log"
          title={settings.section_achievements_heading || 'Achievements'}
          subtitle={settings.section_achievements_subtitle}
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((a, i) => (
            <div key={a.id} className="card p-6 group hover:border-primary-500/50 hover:shadow-glow transition-all animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2.5 rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-400 group-hover:bg-primary-500 group-hover:text-surface-950 transition-all duration-300">
                  <Icon name={a.icon} size={20} />
                </span>
                <span className="ml-auto text-emerald-400"><FiCheckCircle /></span>
              </div>
              <h3 className="font-mono text-lg font-bold text-white mb-1">
                <span className="text-primary-400">+</span> {a.title}
              </h3>
              {a.date_awarded && (
                <p className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mb-3">
                  <FiCalendar /> {new Date(a.date_awarded).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {a.issuer ? ` @ ${a.issuer}` : ''}
                </p>
              )}
              {a.description && <p className="text-slate-400 text-sm leading-relaxed">{a.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}