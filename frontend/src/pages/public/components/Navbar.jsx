import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiTwitter, FiDownload, FiSearch } from 'react-icons/fi';

const SECTION_LABELS = {
  about: 'about', stats: null, skills: 'skills', services: 'services',
  projects: 'projects', tools: 'tools', experience: 'experience',
  education: 'education', certifications: 'certs',
  achievements: 'awards', testimonials: 'reviews',
  blog: 'blog', contact: 'contact',
};

export default function Navbar({ profile, settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const pos = window.scrollY + 120;
      let current = '';
      document.querySelectorAll('section[id]').forEach((s) => {
        if (pos >= s.offsetTop) current = s.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = Object.entries(SECTION_LABELS)
    .filter(([id, label]) => label && settings[`show_${id}`] !== false)
    .map(([id, label]) => ({ id, label }));

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-surface-950/90 backdrop-blur-xl border-b border-surface-700/60 py-2.5 shadow-card' : 'bg-transparent py-5'}`}>
      <div className="container-custom flex items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-2.5 group font-mono">
          <span className="w-9 h-9 rounded-md bg-surface-900 border border-primary-500/40 flex items-center justify-center text-primary-400 font-bold text-sm group-hover:border-primary-400 group-hover:text-primary-300 transition-colors">
            {'>_'}
          </span>
          <span className="font-mono font-bold text-sm text-slate-300">
            <span className="text-primary-400">~</span>/{profile?.full_name?.split(' ')[0].toLowerCase() || 'mohit'}
            <span className="text-primary-400 cursor-blink">_</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1 font-mono text-sm">
          {navItems.slice(0, 8).map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-3 py-2 rounded-md transition-colors ${
                active === item.id ? 'text-primary-300 bg-primary-500/10 border border-primary-500/20' : 'text-slate-400 hover:text-primary-300 border border-transparent'
              }`}
            >
              ./{item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-mono text-slate-600 border border-surface-700 rounded-md px-2.5 py-1.5">
            <FiSearch size={12} /> Ctrl+K
          </span>
          {profile?.github && <a href={profile.github} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-primary-300 transition-colors"><FiGithub size={16} /></a>}
          {profile?.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-primary-300 transition-colors"><FiLinkedin size={16} /></a>}
          {profile?.twitter && <a href={profile.twitter} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-primary-300 transition-colors"><FiTwitter size={16} /></a>}
          {profile?.resume_url ? (
            <a href={profile.resume_url} target="_blank" rel="noreferrer" className="btn-primary !px-4 !py-2 text-xs">
              <FiDownload className="text-surface-950" size={14} /> resume
            </a>
          ) : (
            <a href="#contact" className="btn-ghost !px-4 !py-2 text-xs">hire_me()</a>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-slate-300 hover:text-primary-300">
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-surface-950/95 backdrop-blur-xl border-t border-surface-700/60 animate-slide-down">
          <div className="container-custom py-4 flex flex-col font-mono text-sm">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)} className="py-3 text-slate-300 hover:text-primary-300 border-b border-surface-800/60 last:border-0">
                <span className="text-primary-400">$</span> go_to {item.label}
              </a>
            ))}
            <div className="flex items-center gap-4 pt-4">
              {profile?.github && <a href={profile.github} className="text-slate-400 hover:text-primary-300"><FiGithub /></a>}
              {profile?.linkedin && <a href={profile.linkedin} className="text-slate-400 hover:text-primary-300"><FiLinkedin /></a>}
              {profile?.twitter && <a href={profile.twitter} className="text-slate-400 hover:text-primary-300"><FiTwitter /></a>}
              {profile?.resume_url && <a href={profile.resume_url} download className="btn-primary !px-4 !py-2 text-xs ml-auto"><FiDownload /> resume</a>}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}