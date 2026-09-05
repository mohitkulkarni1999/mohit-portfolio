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
          eyebrow="Education"
          title={settings.section_education_heading || 'Education'}
          subtitle={settings.section_education_subtitle}
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((edu, i) => (
            <div key={edu.id} className="card-hover p-6 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <span className="inline-flex w-12 h-12 rounded-xl bg-primary-500/10 text-primary-400 items-center justify-center mb-4">
                <FiBookOpen size={22} />
              </span>
              <h3 className="font-display text-lg font-semibold text-white mb-1">{edu.degree}</h3>
              <p className="text-primary-400 text-sm font-medium mb-3">{edu.institution}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-1.5"><FiCalendar /> {new Date(edu.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {edu.end_date ? new Date(edu.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}</span>
              </div>
              {edu.field_of_study && <p className="text-sm text-slate-400 mb-1">{edu.field_of_study}</p>}
              {edu.grade && (
                <p className="flex items-center gap-1.5 text-sm text-slate-300"><FiAward className="text-yellow-400" /> {edu.grade}</p>
              )}
              {edu.description && <p className="text-slate-400 text-sm mt-3 leading-relaxed">{edu.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
