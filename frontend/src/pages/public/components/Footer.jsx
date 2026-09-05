import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

export default function Footer({ profile }) {
  return (
    <footer className="border-t border-surface-700/60 bg-surface-950/60">
      <div className="container-custom py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-white">
              {profile?.full_name || 'Mohit'} <span className="text-primary-400">.</span>
            </p>
            <p className="text-slate-500 text-sm mt-1">© {new Date().getFullYear()} All rights reserved.</p>
          </div>

          <div className="flex items-center gap-3">
            {profile?.github && <a href={profile.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-lg border border-surface-700 text-slate-400 hover:text-primary-300 hover:border-primary-500/50 transition-all"><FiGithub /></a>}
            {profile?.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-lg border border-surface-700 text-slate-400 hover:text-primary-300 hover:border-primary-500/50 transition-all"><FiLinkedin /></a>}
            {profile?.twitter && <a href={profile.twitter} target="_blank" rel="noreferrer" className="p-2.5 rounded-lg border border-surface-700 text-slate-400 hover:text-primary-300 hover:border-primary-500/50 transition-all"><FiTwitter /></a>}
            {profile?.email && <a href={`mailto:${profile.email}`} className="p-2.5 rounded-lg border border-surface-700 text-slate-400 hover:text-primary-300 hover:border-primary-500/50 transition-all"><FiMail /></a>}
          </div>

          <a href="/dashboard" className="text-sm text-slate-500 hover:text-primary-300 transition-colors">
            Admin Dashboard
          </a>
        </div>
      </div>
    </footer>
  );
}
