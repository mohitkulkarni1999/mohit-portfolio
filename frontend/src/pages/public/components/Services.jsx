import { useState, useEffect } from 'react';
import { FiCheck } from 'react-icons/fi';
import api from '../../../api/client';
import SectionHeader from '../../../components/SectionHeader';
import Icon from '../../../components/Icon';

export default function Services({ settings }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get('/services').then((res) => setServices(res.data || []));
  }, []);

  if (!services.length) return null;

  return (
    <section id="services" className="relative overflow-hidden section-pad">
      <div className="container-custom relative">
        <SectionHeader
          eyebrow="work orders 04"
          title={settings.section_services_heading || 'What I Do'}
          subtitle={settings.section_services_subtitle}
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div key={service.id} className="card border-2 border-ink/70 shadow-card p-0 group flex flex-col">
              <div className="flex items-center justify-between px-5 py-3 bg-surface-900 border-b-2 border-ink/70 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
                <span>Work Order W-{String(i + 1).padStart(2, '0')}</span>
                <span className="text-primary-600 font-bold">{String(i + 1).padStart(2, '0')}/{String(services.length).padStart(2, '0')}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex w-11 h-11 bg-primary-500 border border-ink text-ink items-center justify-center shadow-glow shrink-0 group-hover:-translate-y-0.5 transition-transform">
                    <Icon name={service.icon} size={20} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">scope: 0{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-display text-lg font-bold uppercase text-ink mb-2 break-words">
                  <span className="text-primary-600">/</span>{service.title}
                </h3>
                <p className="text-ink-soft text-sm mb-4 leading-relaxed break-words flex-1">{service.description}</p>
                {service.features?.length > 0 && (
                  <ul className="space-y-2 font-mono text-sm">
                    {service.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-ink-soft break-words">
                        <span className="w-3 h-3 mt-1 bg-primary-500/20 border border-primary-600 text-primary-600 flex items-center justify-center shrink-0"><FiCheck size={9} /></span>
                        <span className="min-w-0 break-words">{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex items-center justify-between px-6 py-3 bg-surface-900 border-t-2 border-ink/70 font-mono text-[11px] uppercase tracking-widest text-ink-faint gap-2 min-w-0">
                <span className="truncate">{service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}</span>
                <span className="whitespace-nowrap text-primary-600 font-bold">status: open</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}