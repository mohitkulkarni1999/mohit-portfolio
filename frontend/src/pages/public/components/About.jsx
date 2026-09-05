import { FiDownload, FiArrowRight, FiPlus } from 'react-icons/fi';
import SectionHeader from '../../../components/SectionHeader';

export default function About({ profile, settings }) {
  const facts = [
    profile?.full_name && ['name', profile.full_name],
    profile?.email && ['email', profile.email],
    profile?.location && ['location', profile.location],
    profile?.phone && ['phone', profile.phone],
  ].filter(Boolean);

  return (
    <section id="about" className="relative overflow-hidden section-pad">
      <div className="container-custom relative">
        <SectionHeader
          eyebrow="dwg. note 02"
          title={settings.section_about_heading || 'About Me'}
          subtitle={settings.section_about_subtitle}
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            <div className="card relative border-2 border-ink/70 shadow-card p-7">
              <span className="absolute -top-2 -left-2 text-primary-500" aria-hidden><FiPlus size={14} /></span>
              <span className="absolute -bottom-2 -right-2 text-primary-500" aria-hidden><FiPlus size={14} /></span>
              <div className="flex items-center justify-between mb-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">Bio / Profile</p>
                <span className="stamp">Spec. Sheet</span>
              </div>
              <p className="text-ink-soft text-base sm:text-lg leading-relaxed">
                {profile?.bio || 'Passionate software developer dedicated to building high-quality web applications. Always eager to learn new technologies and solve complex problems.'}
              </p>
            </div>

            <div className="card border-2 border-ink/70 shadow-card p-0">
              <div className="px-5 py-3 bg-surface-900 border-b-2 border-ink/70 font-mono text-[11px] uppercase tracking-widest text-ink-soft flex items-center justify-between">
                <span>Data Sheet — Contact Pts</span>
                <span className="text-ink-faint">F-4</span>
              </div>
              <div className="p-5 grid sm:grid-cols-2 gap-x-8 gap-y-4 font-mono">
                {facts.map(([label, value]) => (
                  <div key={label} className="flex items-start gap-2 min-w-0">
                    <span className="text-primary-600 mt-0.5 shrink-0">[{label}]</span>
                    <div className="min-w-0">
                      <p className="text-xs text-ink-faint uppercase tracking-wide">{label.toUpperCase()}:</p>
                      <p className="text-ink text-sm truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {profile?.resume_url && (
                <a href={profile.resume_url} target="_blank" rel="noreferrer" className="btn-ghost !py-2.5 !px-5 text-xs">
                  <FiDownload className="text-primary-600" /> resume.pdf
                </a>
              )}
              <a href="#contact" className="btn-primary !py-2.5 !px-5 text-xs">
                connect <FiArrowRight size={14} />
              </a>
            </div>
          </div>

          <div className="card relative border-2 border-ink/70 shadow-card p-0">
            <div className="flex items-center justify-between px-4 py-2.5 bg-surface-900 border-b-2 border-ink/70 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
              <span>Workmanship Notes</span>
              <span className="text-ink-faint">NTS</span>
            </div>

            <div className="relative bg-grid p-7 sm:p-9">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-10 h-10 bg-primary-500 border border-ink flex items-center justify-center font-display font-extrabold text-ink shadow-glow">
                  {profile?.full_name?.split(' ').map((w) => w[0]).slice(0, 2).join('') || 'MK'}
                </span>
                <div>
                  <p className="font-mono font-bold uppercase tracking-widest text-ink">{profile?.full_name || 'Mohit Kulkarni'}</p>
                  <p className="font-mono text-xs text-ink-faint">classification: FULL-STACK</p>
                </div>
              </div>

              <ul className="space-y-4 font-mono text-sm">
                {[
                  'builds products end-to-end',
                  'cares about clean, readable code',
                  'ships fast, iterates faster',
                  'systematic — spec first, then execute',
                ].map((line, i) => (
                  <li key={i} className="flex items-center gap-3 text-ink-soft">
                    <span className="w-4 h-px bg-primary-500 shrink-0" aria-hidden />
                    <span className="border-b border-dotted border-ink/25 flex-1 pb-0.5">{line}</span>
                    <span className="text-ink-faint text-xs">{String(i + 1).padStart(2, '0')}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-4 border-t-2 border-ink/70 font-mono text-xs text-ink-faint flex items-center justify-between">
                <span>status: accepting_projects</span>
                <span className="text-primary-600 font-bold">[READY]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}