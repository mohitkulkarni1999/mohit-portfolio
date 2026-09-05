import { useState, useEffect } from 'react';
import { FiCalendar, FiBookOpen, FiAward, FiPlus } from 'react-icons/fi';
import api from '../../../api/client';
import SectionHeader from '../../../components/SectionHeader';

export default function Education({ settings }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/education').then((res) => setItems(res.data || []));
  }, []);

  if (!items.length) return null;

  return (
    <section id="education" className="relative overflow-hidden section-pad">
      <div className="container-custom relative">
        <SectionHeader
          eyebrow="program records 08"
          title={settings.section_education_heading || 'Education'}
          subtitle={settings.section_education_subtitle}
        />

        <div className="mt-10 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((edu, i) => (
            <div key={edu.id} className="card relative border-2 border-ink/70 shadow-card p-0 flex flex-col">
              <span className="absolute -top-2 -left-2 text-primary-500" aria-hidden><FiPlus size={14} /></span>
              <div className="flex items-center justify-between px-5 py-3 bg-surface-900 border-b-2 border-ink/70 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
                <span className="flex items-center gap-2"><FiBookOpen className="text-primary-600" size={14} /> Program Record</span>
                <span>REC-0{i + 1}</span>
              </div>
              <div className="p-6 flex-1">
                <h3 className="font-display text-lg font-extrabold uppercase text-ink mb-1 break-words">{edu.degree}</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-primary-600 font-bold mb-3">@ {edu.institution}</p>
                {edu.field_of_study && <p className="text-sm text-ink-soft mb-2 font-mono">{edu.field_of_study}</p>}
                <div className="flex flex-wrap items-center gap-3 text-xs text-ink-faint font-mono mb-3">
                  <span className="flex items-center gap-1.5"><FiCalendar className="text-primary-600" /> {new Date(edu.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} → {edu.end_date ? new Date(edu.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'now'}</span>
                </div>
                {edu.grade && (
                  <p className="inline-flex items-center gap-2 px-2.5 py-1 bg-primary-500/10 border border-primary-500/40 font-mono text-xs text-primary-700 font-bold">
                    <FiAward className="text-primary-600" size={13} /> {edu.grade}
                  </p>
                )}
                {edu.description && <p className="text-ink-soft text-sm mt-3 leading-relaxed break-words">{edu.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}