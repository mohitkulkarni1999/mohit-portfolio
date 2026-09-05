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
          eyebrow="Services"
          title={settings.section_services_heading || 'What I Do'}
          subtitle={settings.section_services_subtitle}
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div key={service.id} className="card-hover p-7 group animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <span className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-700/20 text-primary-400 items-center justify-center mb-5 group-hover:from-primary-500 group-hover:to-primary-600 group-hover:text-white transition-all duration-300">
                <Icon name={service.icon} size={24} />
              </span>
              <h3 className="font-display text-lg font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{service.description}</p>
              {service.features?.length > 0 && (
                <ul className="space-y-2">
                  {service.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                      <FiCheck className="text-emerald-400 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
