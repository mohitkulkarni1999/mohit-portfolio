import { useState, useEffect } from 'react';
import { FiExternalLink, FiCalendar, FiAward, FiPlus } from 'react-icons/fi';
import api from '../../../api/client';
import SectionHeader from '../../../components/SectionHeader';
import BlueprintBackground from '../../../components/BlueprintBackground';

export default function Certifications({ settings }) {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    api.get('/certificates').then((res) => setCerts(res.data || []));
  }, []);

  if (!certs.length) return null;

  return (
    <section id="certifications" className="relative overflow-hidden section-pad bg-surface-900/40">
      <BlueprintBackground variant="alt" />
      <div className="container-custom relative">
        <SectionHeader
          eyebrow="verification 09"
          title={settings.section_certifications_heading || 'Certifications'}
          subtitle={settings.section_certifications_subtitle}
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <div key={cert.id} className="card relative border-2 border-ink/70 shadow-card p-0 flex flex-col">
              <span className="absolute -top-2 -right-2 text-primary-500" aria-hidden><FiPlus size={14} /></span>
              <div className="flex items-center justify-between px-5 py-3 bg-surface-900 border-b-2 border-ink/70 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
                <span className="flex items-center gap-2"><FiAward className="text-primary-600" size={14} /> Cert. CER-0{i + 1}</span>
                {cert.credential_url && (
                  <a href={cert.credential_url} target="_blank" rel="noreferrer" className="text-ink-soft hover:text-primary-600 transition-colors" aria-label="Verify credential">
                    <FiExternalLink size={14} />
                  </a>
                )}
              </div>
              <div className="p-6 relative flex-1">
                <div className="absolute top-5 right-5 stamp hidden sm:inline-flex">verified</div>
                <h3 className="font-display text-lg font-extrabold uppercase text-ink mb-1 pr-24 break-words">{cert.title}</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-primary-600 font-bold mb-3">Issued by: {cert.issuer}</p>
                {cert.date_earned && (
                  <p className="flex items-center gap-1.5 text-xs text-ink-faint font-mono mb-3">
                    <FiCalendar className="text-primary-600" /> {new Date(cert.date_earned).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    <span className="text-primary-600 font-bold ml-2 border border-primary-500/40 px-1.5 py-0.5">[checked]</span>
                  </p>
                )}
                {cert.description && <p className="text-ink-soft text-sm leading-relaxed break-words">{cert.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}