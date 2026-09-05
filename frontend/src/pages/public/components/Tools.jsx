import { useState, useEffect } from 'react';
import api from '../../../api/client';
import SectionHeader from '../../../components/SectionHeader';

export default function Tools({ settings }) {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    api.get('/tools').then((res) => setTools(res.data || []));
  }, []);

  if (!tools.length) return null;

  const grouped = tools.reduce((acc, t) => {
    const c = t.category || 'tools';
    if (!acc[c]) acc[c] = [];
    acc[c].push(t);
    return acc;
  }, {});

  let row = 0;

  return (
    <section id="tools" className="relative overflow-hidden section-pad">
      <div className="container-custom relative">
        <SectionHeader
          eyebrow="factory spec 05"
          title={settings.section_tools_heading || 'Tools & Technologies'}
          subtitle={settings.section_tools_subtitle}
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="card border-2 border-ink/70 shadow-card p-0">
              <div className="px-5 py-3 bg-surface-900 border-b-2 border-ink/70 font-mono text-[11px] uppercase tracking-widest text-ink-soft flex items-center justify-between">
                <span className="font-bold">{cat}</span>
                <span className="text-ink-faint">{String(items.length).padStart(2, '0')}</span>
              </div>
              <div className="divide-y divide-ink/10">
                {items.map((tool) => {
                  row += 1;
                  return (
                    <div key={tool.id} className="flex items-start gap-3 px-4 py-2.5 font-mono text-sm">
                      <span className="text-ink-faint text-xs pt-1 shrink-0">{String(row).padStart(2, '0')}</span>
                      <div className="min-w-0 flex-1">
                        <span className="text-ink font-semibold">{tool.name}</span>
                        {tool.description && <span className="text-ink-faint text-xs hidden sm:inline"> — {tool.description}</span>}
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