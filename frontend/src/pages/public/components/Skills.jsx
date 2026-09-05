import { useState, useEffect } from 'react';
import api from '../../../api/client';
import SectionHeader from '../../../components/SectionHeader';
import Icon from '../../../components/Icon';

export default function Skills({ settings }) {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    api.get('/skills').then((res) => setSkills(res.data || []));
  }, []);

  if (!skills.length) return null;

  const grouped = skills.reduce((acc, s) => {
    const cat = s.category || 'technical';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <section id="skills" className="section-pad bg-surface-900/40">
      <div className="container-custom">
        <SectionHeader
          eyebrow="skills --list"
          title={settings.section_skills_heading || 'My Skills'}
          subtitle={settings.section_skills_subtitle}
        />

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(grouped).map(([cat, items], gi) => (
            <div key={cat} className="card overflow-hidden p-0 animate-slide-up" style={{ animationDelay: `${gi * 100}ms` }}>
              <div className="flex items-center gap-3 px-5 py-3.5 bg-surface-900/90 border-b border-surface-700/60">
                <span className="p-2 rounded-md bg-primary-500/10 text-primary-400"><Icon name={cat === 'technical' ? 'code' : cat} size={16} /></span>
                <h3 className="font-mono font-semibold text-white text-sm">
                  <span className="text-primary-400">/</span>{cat.toLowerCase()}
                </h3>
                <span className="ml-auto text-xs text-slate-600 font-mono">{items.length} items</span>
              </div>
              <div className="p-5 space-y-4 font-mono">
                {items.map((skill, i) => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-300">
                        <span className="text-primary-400 select-none">▪</span> {skill.name}
                      </span>
                      <span className="text-amber-400 text-xs">{skill.proficiency}%</span>
                    </div>
                    <div className="h-1.5 bg-surface-800 rounded-full overflow-hidden group">
                      <div
                        className="h-full bg-gradient-to-r from-primary-700 via-primary-500 to-primary-400 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.proficiency}%`, animationDelay: `${i * 100}ms` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}