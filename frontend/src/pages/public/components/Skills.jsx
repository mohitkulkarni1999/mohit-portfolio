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

  let itemNo = 0;

  return (
    <section id="skills" className="section-pad bg-surface-900/40">
      <div className="container-custom">
        <SectionHeader
          eyebrow="materials list 03"
          title={settings.section_skills_heading || 'My Skills'}
          subtitle={settings.section_skills_subtitle}
        />

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(grouped).map(([cat, items], gi) => (
            <div key={cat} className="card border-2 border-ink/70 shadow-card p-0">
              <div className="flex items-center gap-3 px-5 py-3.5 bg-surface-900 border-b-2 border-ink/70">
                <span className="w-8 h-8 bg-primary-500/10 border border-primary-500/50 text-primary-600 flex items-center justify-center shrink-0">
                  <Icon name={cat === 'technical' ? 'code' : cat} size={15} />
                </span>
                <h3 className="font-mono font-bold uppercase tracking-widest text-ink text-sm">{cat}</h3>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-ink-faint">{String(items.length).padStart(2, '0')} ITEMS</span>
              </div>
              <div className="p-5 space-y-5 font-mono">
                {items.map((skill, i) => {
                  itemNo += 1;
                  return (
                    <div key={skill.id}>
                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <span className="text-ink text-sm">
                          <span className="text-primary-600 font-bold mr-2">{String(itemNo).padStart(2, '0')}.</span>
                          {skill.name}
                        </span>
                        <span className="text-primary-600 text-xs font-bold shrink-0">{skill.proficiency}%</span>
                      </div>
                      <div className="h-1.5 bg-surface-800 border border-surface-700">
                        <div
                          className="h-full bg-primary-500"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}