import { useState, useEffect } from 'react';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import api from '../../../api/client';
import SectionHeader from '../../../components/SectionHeader';

const HASHES = ['a1b2c3d', 'e4f5a6b', '7c8d9e0', 'f1a2b3c', '4d5e6f7', 'a8b9c0d', 'e1f2a3b'];

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
          eyebrow="history --job-log"
          title={settings.section_experience_heading || 'Work Experience'}
          subtitle={settings.section_experience_subtitle}
        />

        <div className="mt-14 max-w-4xl mx-auto">
          <div className="relative font-mono">
            <p className="text-xs text-slate-600 mb-8 flex items-center gap-2">
              <span className="text-primary-400">$</span> git log --career --oneline
            </p>
            <div className="relative border-l-2 border-primary-500/30 ml-2 sm:ml-4 space-y-10">
              {items.map((exp, i) => (
                <div key={exp.id} className="relative pl-6 sm:pl-10 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <span className="absolute -left-[7px] top-1.5 text-primary-400">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><circle cx="7" cy="7" r="3.5" /></svg>
                  </span>
                  <div className="card p-6 hover:border-primary-500/50 hover:shadow-glow transition-all">
                    <p className="text-xs text-slate-500 mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-surface-600">commit</span>
                      <span className="text-amber-400">{HASHES[i % HASHES.length]}</span>
                      {exp.is_current && <span className="chip !border-emerald-500/30 !text-emerald-300 !bg-emerald-500/10">HEAD</span>}
                    </p>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-mono text-lg font-bold text-white">{exp.position}</h3>
                        <p className="text-primary-400 font-mono text-sm">@{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono mb-3">
                      <span className="flex items-center gap-1.5"><FiCalendar /> {new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} → {exp.is_current || !exp.end_date ? 'now' : new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                      {exp.location && <span className="flex items-center gap-1.5"><FiMapPin /> {exp.location}</span>}
                    </div>
                    {exp.description && <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="ml-2 sm:ml-4 pl-6 sm:pl-10 mt-8 text-slate-600 text-xs">
              <span className="text-primary-400">$</span> <span className="text-slate-500">git log</span> --to-be-continued<span className="cursor-blink text-primary-400">_</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}