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

  return (
    <section id="tools" className="section-pad bg-surface-900/40">
      <div className="container-custom">
        <SectionHeader
          eyebrow="package.json --dependencies"
          title={settings.section_tools_heading || 'Tools & Technologies'}
          subtitle={settings.section_tools_subtitle}
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="card overflow-hidden p-0">
              <div className="px-5 py-3 bg-surface-900/90 border-b border-surface-700/60 font-mono text-xs text-slate-400 flex items-center justify-between">
                <span className="uppercase tracking-wider">{cat}</span>
                <span className="text-slate-600">{items.length}</span>
              </div>
              <div className="p-4 space-y-1.5 font-mono">
                {items.map((tool, i) => (
                  <div key={tool.id} className="flex items-center gap-2 text-sm rounded-md px-2 py-1.5 hover:bg-surface-900/70 transition-colors animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                    <span className="text-surface-700 select-none">$</span>
                    <div className="min-w-0 flex-1">
                      <span className="text-slate-200">{tool.name}</span>
                      {tool.description && <span className="text-slate-600 hidden sm:inline"> — {tool.description}</span>}
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