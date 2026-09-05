import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiTwitter, FiDownload } from 'react-icons/fi';

const SECTION_LABELS = {
  about: 'About', stats: null, skills: 'Skills', services: 'Services',
  projects: 'Projects', tools: 'Tools', experience: 'Experience',
  education: 'Education', certifications: 'Certifications',
  achievements: 'Achievements', testimonials: 'Testimonials',
  blog: 'Blog', contact: 'Contact',
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

  const initials = (profile?.full_name || 'M').split(' ').map((w) => w[0]).slice(0, 2).join('');

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-surface-950/85 backdrop-blur-xl border-b border-surface-700/60 py-3 shadow-card' : 'bg-transparent py-5'}`}>
      <div className="container-custom flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-display font-bold text-sm shadow-glow group-hover:scale-105 transition-transform">
            {initials}
          </span>
          <span className="font-display font-bold text-lg text-white">
            {profile?.full_name?.split(' ')[0] || 'Mohit'}
            <span className="text-primary-400">.</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.slice(0, 8).map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                active === item.id ? 'text-primary-300 bg-primary-500/10' : 'text-slate-300 hover:text-white hover:bg-surface-800/50'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {profile?.github && <a href={profile.github} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-primary-300 transition-colors"><FiGithub size={18} /></a>}
          {profile?.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-primary-300 transition-colors"><FiLinkedin size={18} /></a>}
          {profile?.twitter && <a href={profile.twitter} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-primary-300 transition-colors"><FiTwitter size={18} /></a>}
          {profile?.resume_url ? (
            <a href={profile.resume_url} target="_blank" rel="noreferrer" className="btn-primary !px-5 !py-2.5 text-sm">
              <FiDownload /> Resume
            </a>
          ) : (
            <a href="#contact" className="btn-ghost !px-5 !py-2.5 text-sm">Hire Me</a>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-slate-300 hover:text-white">
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-surface-950/95 backdrop-blur-xl border-t border-surface-700/60 animate-slide-down">
          <div className="container-custom py-4 flex flex-col">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)} className="py-3 text-slate-300 hover:text-primary-300 border-b border-surface-800/60 last:border-0">
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-4">
              {profile?.github && <a href={profile.github} className="p-2 text-slate-400 hover:text-primary-300"><FiGithub /></a>}
              {profile?.linkedin && <a href={profile.linkedin} className="p-2 text-slate-400 hover:text-primary-300"><FiLinkedin /></a>}
              {profile?.twitter && <a href={profile.twitter} className="p-2 text-slate-400 hover:text-primary-300"><FiTwitter /></a>}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
