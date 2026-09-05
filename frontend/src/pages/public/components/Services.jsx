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
    <section id="services" className="section-pad">
      <div className="container-custom">
        <SectionHeader
          eyebrow="services --list"
          title={settings.section_services_heading || 'What I Do'}
          subtitle={settings.section_services_subtitle}
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div key={service.id} className="card overflow-hidden p-0 group animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex w-11 h-11 rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-400 items-center justify-center group-hover:bg-primary-500 group-hover:text-surface-950 group-hover:border-primary-500 transition-all duration-300">
                    <Icon name={service.icon} size={20} />
                  </span>
                  <span className="font-mono text-xs text-slate-600">def {service.title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}():</span>
                </div>
                <h3 className="font-mono text-lg font-bold text-white mb-2">
                  <span className="text-amber-400">#</span> {service.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{service.description}</p>
                {service.features?.length > 0 && (
                  <ul className="space-y-2 font-mono text-sm">
                    {service.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-300">
                        <FiCheck className="text-primary-400 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="px-6 py-3 bg-surface-900/70 border-t border-surface-700/50 font-mono text-xs text-slate-500 flex items-center gap-2">
                <span className="text-primary-400">$</span> install {service.title.toLowerCase().replace(/[^a-z0-9]/gi, '-')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}