import { useState, useEffect } from 'react';
import { FiExternalLink, FiCalendar, FiAward } from 'react-icons/fi';
import api from '../../../api/client';
import SectionHeader from '../../../components/SectionHeader';

export default function Certifications({ settings }) {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    api.get('/certificates').then((res) => setCerts(res.data || []));
  }, []);

  if (!certs.length) return null;

  return (
    <section id="certifications" className="section-pad bg-surface-900/40">
      <div className="container-custom">
        <SectionHeader
          eyebrow="certs --verified"
          title={settings.section_certifications_heading || 'Certifications'}
          subtitle={settings.section_certifications_subtitle}
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <div key={cert.id} className="card overflow-hidden p-0 animate-slide-up flex flex-col" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="px-5 py-3 bg-surface-900/90 border-b border-surface-700/60 font-mono text-xs text-slate-500 flex items-center justify-between">
                <span className="flex items-center gap-2"><FiAward className="text-amber-400" /> certificate.crt</span>
                {cert.credential_url && (
                  <a href={cert.credential_url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-primary-400 transition-colors">
                    <FiExternalLink size={14} />
                  </a>
                )}
              </div>
              <div className="p-6 flex-1">
                <h3 className="font-mono text-base font-bold text-white mb-1">{cert.title}</h3>
                <p className="text-primary-400 font-mono text-sm mb-2">@ {cert.issuer}</p>
                {cert.date_earned && (
                  <p className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mb-3">
                    <FiCalendar /> {new Date(cert.date_earned).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    <span className="text-emerald-400 ml-2">[verified]</span>
                  </p>
                )}
                {cert.description && <p className="text-slate-400 text-sm leading-relaxed">{cert.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}