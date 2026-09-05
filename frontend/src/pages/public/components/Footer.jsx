import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

export default function Footer({ profile }) {
  return (
    <footer className="border-t border-surface-700/60 bg-surface-950/70">
      <div className="container-custom py-8 font-mono">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">
              <span className="text-primary-400">$</span> echo <span className="text-amber-300">"© {new Date().getFullYear()} {profile?.full_name || 'Mohit'} — all rights reserved"</span>
            </p>
            <p className="text-xs text-slate-600 mt-1">exit 0<br /></p>
          </div>

          <div className="flex items-center gap-2">
            {profile?.github && <a href={profile.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-md border border-surface-700 text-slate-400 hover:text-primary-300 hover:border-primary-500/50 transition-all" aria-label="GitHub"><FiGithub size={15} /></a>}
            {profile?.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-md border border-surface-700 text-slate-400 hover:text-primary-300 hover:border-primary-500/50 transition-all" aria-label="LinkedIn"><FiLinkedin size={15} /></a>}
            {profile?.twitter && <a href={profile.twitter} target="_blank" rel="noreferrer" className="p-2.5 rounded-md border border-surface-700 text-slate-400 hover:text-primary-300 hover:border-primary-500/50 transition-all" aria-label="Twitter"><FiTwitter size={15} /></a>}
            {profile?.email && <a href={`mailto:${profile.email}`} className="p-2.5 rounded-md border border-surface-700 text-slate-400 hover:text-primary-300 hover:border-primary-500/50 transition-all" aria-label="Email"><FiMail size={15} /></a>}
          </div>

          <a href="/dashboard" className="text-xs text-slate-500 hover:text-primary-300 transition-colors">
            <span className="text-primary-400">$</span> ./login --admin
          </a>
        </div>
      </div>
    </footer>
  );
}