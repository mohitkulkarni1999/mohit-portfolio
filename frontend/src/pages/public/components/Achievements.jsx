import { useState, useEffect } from 'react';
import { FiCalendar } from 'react-icons/fi';
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
    <section id="achievements" className="relative overflow-hidden section-pad">
      <div className="container-custom relative">
        <SectionHeader
          eyebrow="ledger record 10"
          title={settings.section_achievements_heading || 'Achievements'}
          subtitle={settings.section_achievements_subtitle}
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((a, i) => (
            <div key={a.id} className="card border-2 border-ink/70 shadow-card p-6 group">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 bg-primary-500/10 border border-primary-500/50 text-primary-600 flex items-center justify-center shrink-0">
                  <Icon name={a.icon} size={18} />
                </span>
                <span className="ml-auto flex items-center gap-2">
                  <span className="w-3 h-3 bg-primary-500 rotate-45" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">LOG-0{i + 1}</span>
                </span>
              </div>
              <h3 className="font-display text-lg font-extrabold uppercase text-ink mb-1 break-words">
                <span className="text-primary-600">+</span> {a.title}
              </h3>
              {a.date_awarded && (
                <p className="flex items-center gap-1.5 text-xs text-ink-faint font-mono mb-3">
                  <FiCalendar className="text-primary-600" /> {new Date(a.date_awarded).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {a.issuer ? ` · ${a.issuer}` : ''}
                </p>
              )}
              {a.description && <p className="text-ink-soft text-sm leading-relaxed break-words">{a.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}