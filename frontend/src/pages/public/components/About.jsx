import { FiDownload, FiArrowRight } from 'react-icons/fi';
import SectionHeader from '../../../components/SectionHeader';

export default function About({ profile, settings }) {
  const facts = [
    profile?.full_name && ['name', profile.full_name],
    profile?.email && ['email', profile.email],
    profile?.location && ['location', profile.location],
    profile?.phone && ['phone', profile.phone],
  ].filter(Boolean);

  return (
    <section id="about" className="section-pad">
      <div className="container-custom">
        <SectionHeader
          eyebrow="about --info"
          title={settings.section_about_heading || 'About Me'}
          subtitle={settings.section_about_subtitle}
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-10 items-start">
          <div className="animate-slide-up space-y-6">
            <p className="text-slate-300 text-lg leading-relaxed">
              <span className="text-primary-400">$</span> {profile?.bio || 'Passionate software developer dedicated to building high-quality web applications. Always eager to learn new technologies and solve complex problems.'}
            </p>
            <div className="card overflow-hidden p-0">
              <div className="px-5 py-3 bg-surface-900/90 border-b border-surface-700/60 font-mono text-xs text-slate-500 flex items-center gap-2">
                <span className="text-primary-400">$</span> neofetch ./me
              </div>
              <div className="p-5 grid sm:grid-cols-2 gap-4 font-mono">
                {facts.map(([label, value]) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-primary-400 mt-0.5">{'>'}</span>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 uppercase tracking-wide">{label}:</p>
                      <p className="text-slate-200 text-sm truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {profile?.resume_url && (
                <a href={profile.resume_url} target="_blank" rel="noreferrer" className="btn-ghost !py-2.5 !px-5 text-xs">
                  <FiDownload className="text-amber-400" /> resume.pdf
                </a>
              )}
              <a href="#contact" className="btn-primary !py-2.5 !px-5 text-xs">
                <span className="text-surface-950">git</span> <span className="text-surface-950">connect</span> <FiArrowRight className="text-surface-950" />
              </a>
            </div>
          </div>

          <div className="card overflow-hidden p-0 animate-slide-in-right hover:border-primary-500/40 transition-colors">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-900/90 border-b border-surface-700/60">
              <span className="terminal-dots">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </span>
              <span className="ml-3 text-xs text-slate-500 font-mono">~/portfolio/README.md</span>
            </div>
            <div className="p-6 font-mono text-sm leading-7">
              <p className="text-emerald-400 mb-1"># Mohit Kulkarni</p>
              <p className="text-slate-500 mb-3">// full-stack developer & problem solver</p>
              <p className="text-slate-300 mb-1">
                <span className="text-primary-400">const ABOUT</span> <span className="text-slate-500">=</span> <span className="text-amber-300">"I write code that ships."</span>
              </p>
              <div className="text-slate-400 space-y-1 mt-4">
                <p><span className="text-primary-400">-</span> builds products end-to-end</p>
                <p><span className="text-primary-400">-</span> cares about clean, readable code</p>
                <p><span className="text-primary-400">-</span> ships fast, iterates faster</p>
                <p><span className="text-primary-400">-</span> always learning <span className="text-amber-300">git push --force</span> to skill ceiling</p>
              </div>
              <div className="mt-5 pt-4 border-t border-surface-700/50 text-xs text-slate-600">
                <span className="text-primary-400">$</span> git status <span className="text-emerald-400">── clean · ready to collaborate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}