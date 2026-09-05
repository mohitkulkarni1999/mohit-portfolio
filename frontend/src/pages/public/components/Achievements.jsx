import { useState, useEffect } from 'react';
import { FiCalendar, FiAward } from 'react-icons/fi';
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
          eyebrow="Milestones"
          title={settings.section_achievements_heading || 'Achievements'}
          subtitle={settings.section_achievements_subtitle}
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((a, i) => (
            <div key={a.id} className="card-hover p-6 group animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-center gap-4 mb-4">
                <span className="p-3 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-700/20 text-primary-400 group-hover:from-primary-500 group-hover:to-primary-600 group-hover:text-white transition-all duration-300">
                  <Icon name={a.icon} size={22} />
                </span>
                <FiAward className="ml-auto text-yellow-400/60" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-1">{a.title}</h3>
              {a.date_awarded && (
                <p className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                  <FiCalendar /> {new Date(a.date_awarded).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {a.issuer ? ` · ${a.issuer}` : ''}
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
