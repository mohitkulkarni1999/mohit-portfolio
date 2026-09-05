import { useState, useEffect } from 'react';
import api from '../../../api/client';
import SectionHeader from '../../../components/SectionHeader';
import Icon from '../../../components/Icon';

export default function Tools({ settings }) {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    api.get('/tools').then((res) => setTools(res.data || []));
  }, []);

  if (!tools.length) return null;

  const grouped = tools.reduce((acc, t) => {
    const c = t.category || 'Tools';
    if (!acc[c]) acc[c] = [];
    acc[c].push(t);
    return acc;
  }, {});

  return (
    <section id="tools" className="section-pad">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Stack"
          title={settings.section_tools_heading || 'Tools & Technologies'}
          subtitle={settings.section_tools_subtitle}
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="card p-6">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">{cat}</p>
              <div className="space-y-3">
                {items.map((tool, i) => (
                  <div key={tool.id} className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
                    <span className="p-1.5 rounded-md bg-surface-800 text-primary-400"><Icon name="tool" size={14} /></span>
                    <div className="min-w-0">
                      <p className="text-sm text-slate-200 font-medium truncate">{tool.name}</p>
                      {tool.description && <p className="text-xs text-slate-500 truncate">{tool.description}</p>}
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
