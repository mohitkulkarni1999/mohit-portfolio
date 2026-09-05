import { useState, useEffect } from 'react';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import api from '../../../api/client';
import SectionHeader from '../../../components/SectionHeader';

export default function Experience({ settings }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/experience').then((res) => setItems(res.data || []));
  }, []);

  if (!items.length) return null;

  return (
    <section id="experience" className="section-pad bg-surface-900/40">
      <div className="container-custom">
        <SectionHeader
          eyebrow="career log 07"
          title={settings.section_experience_heading || 'Work Experience'}
          subtitle={settings.section_experience_subtitle}
        />

        <div className="mt-14 max-w-4xl mx-auto">
          <div className="flex items-center justify-between px-1 mb-5 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
            <span>Revision Sheet — Rev. Log</span>
            <span>{String(items.length).padStart(2, '0')} ENTRIES</span>
          </div>

          <div className="divide-y-2 divide-ink/15 border-2 border-ink/70 bg-surface-850 shadow-card">
            {items.map((exp, i) => (
              <div key={exp.id} className="relative grid sm:grid-cols-[7.5rem_1fr] gap-2 sm:gap-6 px-5 sm:px-7 py-6">
                <div className="font-mono text-xs text-ink-faint uppercase tracking-widest whitespace-nowrap">
                  <p className="mb-2">
                    {new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <FiCalendar className="text-primary-600" size={12} />
                    {exp.is_current || !exp.end_date ? 'NOW' : new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div className="min-w-0">
                  {exp.is_current && (
                    <div className="mb-2"><span className="stamp !text-primary-600 bg-primary-500/5">current</span></div>
                  )}
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                    <h3 className="font-display text-lg font-extrabold uppercase text-ink break-words">{exp.position}</h3>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint shrink-0">@{exp.company}</span>
                  </div>
                  {exp.description && <p className="text-ink-soft text-sm leading-relaxed break-words">{exp.description}</p>}
                  {exp.location && (
                    <p className="flex items-center gap-1.5 text-xs text-ink-faint font-mono mt-2">
                      <FiMapPin size={12} className="text-primary-600" /> {exp.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 font-mono text-xs text-ink-faint text-center uppercase tracking-widest">
            Rev. log — to be continued
          </p>
        </div>
      </div>
    </section>
  );
}