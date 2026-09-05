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
          eyebrow="Credentials"
          title={settings.section_certifications_heading || 'Certifications'}
          subtitle={settings.section_certifications_subtitle}
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <div key={cert.id} className="card-hover p-6 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex items-start justify-between mb-4">
                <span className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-700/20 text-yellow-400 items-center justify-center">
                  <FiAward size={22} />
                </span>
                {cert.credential_url && (
                  <a href={cert.credential_url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-primary-400 transition-colors">
                    <FiExternalLink />
                  </a>
                )}
              </div>
              <h3 className="font-display text-base font-semibold text-white mb-1">{cert.title}</h3>
              <p className="text-primary-400 text-sm font-medium mb-2">{cert.issuer}</p>
              {cert.date_earned && (
                <p className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                  <FiCalendar /> {new Date(cert.date_earned).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
              )}
              {cert.description && <p className="text-slate-400 text-sm leading-relaxed">{cert.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
