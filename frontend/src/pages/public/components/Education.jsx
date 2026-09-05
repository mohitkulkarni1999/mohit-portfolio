import { useState, useEffect } from 'react';
import { FiCalendar, FiBookOpen, FiAward } from 'react-icons/fi';
import api from '../../../api/client';
import SectionHeader from '../../../components/SectionHeader';

export default function Education({ settings }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/education').then((res) => setItems(res.data || []));
  }, []);

  if (!items.length) return null;

  return (
    <section id="education" className="section-pad">
      <div className="container-custom">
        <SectionHeader
          eyebrow="education --degree"
          title={settings.section_education_heading || 'Education'}
          subtitle={settings.section_education_subtitle}
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((edu, i) => (
            <div key={edu.id} className="card overflow-hidden p-0 animate-slide-up flex flex-col" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="px-5 py-3.5 bg-surface-900/90 border-b border-surface-700/60 font-mono text-xs text-slate-500 flex items-center gap-2">
                <FiBookOpen className="text-primary-400" />
                <span>education: {edu.degree?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'degree'}</span>
              </div>
              <div className="p-6 flex-1">
                <h3 className="font-mono text-lg font-bold text-white mb-1">
                  <span className="text-primary-400">#</span> {edu.degree}
                </h3>
                <p className="text-amber-400 font-mono text-sm font-medium mb-3">@{edu.institution}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono mb-3">
                  <span className="flex items-center gap-1.5"><FiCalendar /> {new Date(edu.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} → {edu.end_date ? new Date(edu.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'now'}</span>
                </div>
                {edu.field_of_study && <p className="text-sm text-slate-400 mb-1">{edu.field_of_study}</p>}
                {edu.grade && (
                  <p className="flex items-center gap-1.5 text-sm text-slate-300 font-mono"><FiAward className="text-amber-400" /> {edu.grade}</p>
                )}
                {edu.description && <p className="text-slate-400 text-sm mt-3 leading-relaxed">{edu.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}