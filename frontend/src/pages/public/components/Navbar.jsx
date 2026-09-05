import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiTwitter, FiDownload, FiPlus } from 'react-icons/fi';

const SECTION_LABELS = {
  about: 'About', stats: null, skills: 'Skills', services: 'Services',
  projects: 'Projects', tools: 'Tools', experience: 'Experience',
  education: 'Education', certifications: 'Certs',
  achievements: 'Achievements', testimonials: 'Reviews',
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
    .map(([id, label]) => ({ id, label: label.toUpperCase() }));

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${scrolled ? 'bg-surface-950/95 backdrop-blur border-b-4 border-double border-ink/70 shadow-card py-2' : 'bg-surface-950/60 border-b border-surface-700 py-4'}`}>
      <div className="container-custom flex items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-3 group">
          <span className="relative w-9 h-9 bg-primary-500 border border-ink flex items-center justify-center shadow-glow group-hover:-translate-y-0.5 transition-transform">
            <FiPlus className="text-ink" size={16} />
            <span className="absolute -top-0.5 -left-0.5 w-2 h-2 border-t border-l border-primary-600" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-b border-r border-primary-600" />
          </span>
          <span className="leading-tight">
            <span className="block font-mono font-bold uppercase tracking-widest text-ink text-sm">
              {profile?.full_name?.split(' ')[0] || 'Mohit'}<span className="text-primary-600">.</span>K
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">
              Design &amp; Development
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center font-mono text-xs font-semibold uppercase tracking-widest">
          {navItems.slice(0, 8).map((item, i) => (
            <span key={item.id} className="flex items-center">
              {i > 0 && <span className="text-ink-faint mx-2" aria-hidden>/</span>}
              <a
                href={`#${item.id}`}
                className={`px-1 py-2 border-t-2 border-transparent transition-colors ${
                  active === item.id ? 'text-primary-600 border-primary-600' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {item.label}
              </a>
            </span>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {profile?.github && <a href={profile.github} target="_blank" rel="noreferrer" className="w-8 h-8 border border-ink/40 flex items-center justify-center text-ink-soft hover:text-primary-600 hover:border-primary-500 transition-colors"><FiGithub size={14} /></a>}
          {profile?.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 border border-ink/40 flex items-center justify-center text-ink-soft hover:text-primary-600 hover:border-primary-500 transition-colors"><FiLinkedin size={14} /></a>}
          {profile?.twitter && <a href={profile.twitter} target="_blank" rel="noreferrer" className="w-8 h-8 border border-ink/40 flex items-center justify-center text-ink-soft hover:text-primary-600 hover:border-primary-500 transition-colors"><FiTwitter size={14} /></a>}
          {profile?.resume_url ? (
            <a href={profile.resume_url} target="_blank" rel="noreferrer" className="btn-primary !px-4 !py-2 !text-[10px]">
              <FiDownload size={13} /> Resume
            </a>
          ) : (
            <a href="#contact" className="btn-ghost !px-4 !py-2 !text-[10px]">Hire</a>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden w-9 h-9 border border-ink/40 flex items-center justify-center text-ink">
          {open ? <FiX size={18} /> : <FiMenu size={18} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-surface-950/98 border-t-4 border-double border-ink/70 animate-fade-in">
          <div className="container-custom py-4 flex flex-col font-mono text-xs font-semibold uppercase tracking-widest">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)} className="py-3 text-ink-soft hover:text-primary-600 border-b hairline last:border-0">
                <span className="text-primary-600 mr-2">/</span>{item.label}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-4">
              {profile?.github && <a href={profile.github} className="w-9 h-9 border border-ink/40 flex items-center justify-center text-ink-soft"><FiGithub /></a>}
              {profile?.linkedin && <a href={profile.linkedin} className="w-9 h-9 border border-ink/40 flex items-center justify-center text-ink-soft"><FiLinkedin /></a>}
              {profile?.twitter && <a href={profile.twitter} className="w-9 h-9 border border-ink/40 flex items-center justify-center text-ink-soft"><FiTwitter /></a>}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}