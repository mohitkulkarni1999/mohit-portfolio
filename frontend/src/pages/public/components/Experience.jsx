import { useState, useEffect } from 'react';
import { FiCalendar, FiBriefcase, FiMapPin } from 'react-icons/fi';
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
          eyebrow="Career"
          title={settings.section_experience_heading || 'Work Experience'}
          subtitle={settings.section_experience_subtitle}
        />

        <div className="mt-14 max-w-4xl mx-auto">
          <div className="relative border-l-2 border-surface-700/60 ml-4 sm:ml-6 space-y-10">
            {items.map((exp, i) => (
              <div key={exp.id} className="relative pl-8 sm:pl-12 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary-500 border-4 border-surface-950" />
                <div className="card-hover p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-white">{exp.position}</h3>
                      <p className="text-primary-400 font-medium">{exp.company}</p>
                    </div>
                    {exp.is_current && (
                      <span className="chip !bg-emerald-500/10 !text-emerald-300 !border-emerald-500/30">Current</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-3">
                    <span className="flex items-center gap-1.5"><FiCalendar /> {new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {exp.is_current || !exp.end_date ? 'Present' : new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    {exp.location && <span className="flex items-center gap-1.5"><FiMapPin /> {exp.location}</span>}
                  </div>
                  {exp.description && <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
