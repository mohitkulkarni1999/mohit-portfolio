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
          eyebrow="Expertise"
          title={settings.section_skills_heading || 'My Skills'}
          subtitle={settings.section_skills_subtitle}
        />

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(grouped).map(([cat, items], gi) => (
            <div key={cat} className="card-hover p-6 animate-slide-up" style={{ animationDelay: `${gi * 100}ms` }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="p-2.5 rounded-lg bg-primary-500/10 text-primary-400"><Icon name={cat === 'technical' ? 'code' : cat} size={20} /></span>
                <h3 className="font-display font-semibold text-white capitalize">{cat}</h3>
              </div>
              <div className="space-y-4">
                {items.map((skill, i) => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-300 font-medium">{skill.name}</span>
                      <span className="text-slate-500 font-mono text-xs">{skill.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-surface-800 rounded-full overflow-hidden group">
                      <div
                        className="h-full bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 rounded-full transition-all duration-1000"
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
