import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

export default function Footer({ profile }) {
  return (
    <footer className="border-t-4 border-double border-ink/60 bg-surface-950">
      <div className="container-custom py-8 font-mono">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-ink uppercase tracking-widest">
              {profile?.full_name || 'Mohit Kulkarni'}
            </p>
            <p className="text-xs text-ink-faint mt-1">
              © {new Date().getFullYear()} — all rights reserved · rev. A
            </p>
          </div>

          <div className="flex items-center gap-2">
            {profile?.github && <a href={profile.github} target="_blank" rel="noreferrer" className="w-9 h-9 border border-ink/40 flex items-center justify-center text-ink-soft hover:border-primary-600 hover:text-primary-600 transition-colors" aria-label="GitHub"><FiGithub size={15} /></a>}
            {profile?.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 border border-ink/40 flex items-center justify-center text-ink-soft hover:border-primary-600 hover:text-primary-600 transition-colors" aria-label="LinkedIn"><FiLinkedin size={15} /></a>}
            {profile?.twitter && <a href={profile.twitter} target="_blank" rel="noreferrer" className="w-9 h-9 border border-ink/40 flex items-center justify-center text-ink-soft hover:border-primary-600 hover:text-primary-600 transition-colors" aria-label="Twitter"><FiTwitter size={15} /></a>}
            {profile?.email && <a href={`mailto:${profile.email}`} className="w-9 h-9 border border-ink/40 flex items-center justify-center text-ink-soft hover:border-primary-600 hover:text-primary-600 transition-colors" aria-label="Email"><FiMail size={15} /></a>}
          </div>

          <a href="/dashboard" className="text-xs text-ink-faint hover:text-primary-600 transition-colors uppercase tracking-widest">
            <span className="text-primary-600">□</span> admin access
          </a>
        </div>

        <div className="mt-6 pt-4 border-t border-ink/15 text-[10px] uppercase tracking-widest text-ink-faint flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
          <span>dwg. no. MOH-001F</span>
          <span>scale nts</span>
          <span>sheet 13 of 13</span>
          <span>drawn by M.K.</span>
        </div>
      </div>
    </footer>
  );
}