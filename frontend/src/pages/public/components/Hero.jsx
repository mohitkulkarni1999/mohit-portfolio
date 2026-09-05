import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail, FiPlus } from 'react-icons/fi';

export default function Hero({ profile, settings }) {
  const highlighted = settings.hero_highlight || profile?.title || 'Software Developer';
  const first = (profile?.full_name || 'Mohit Kulkarni').split(' ')[0];
  const last = (profile?.full_name || 'Mohit Kulkarni').split(' ').slice(1).join(' ') || 'Kulkarni';

  const socials = [
    profile?.github && { label: 'GITHUB', href: profile.github, icon: FiGithub },
    profile?.linkedin && { label: 'LINKEDIN', href: profile.linkedin, icon: FiLinkedin },
    profile?.email && { label: 'EMAIL', href: `mailto:${profile.email}`, icon: FiMail },
  ].filter(Boolean);

  const plateTitle = settings.hero_plate_title || 'Blueprint: Mohit Portfolio';
  const plateSheet = settings.hero_plate_sheet || '01 / 13';
  const plateHeight = settings.hero_plate_height || '1.83 m';
  const plateStack = (settings.hero_plate_stack || 'React · Node\nSQL · Docker\nC# · AWS')
    .split('\n').map((s) => s.trim()).filter(Boolean);
  const plateTolerance = settings.hero_plate_tolerance || '± tolerance 0.01';
  const plateScale = settings.hero_plate_scale || '🧭 Scale 1:1';
  const plateDims = settings.hero_plate_dims || 'Dims in mm';
  const plateRev = settings.hero_plate_rev || 'Rev A';
  const showPlate = settings.show_hero_plate !== false;

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-28">
      <div className="container-custom relative grid lg:grid-cols-2 gap-12 items-center py-16 w-full">
        <div>
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint mb-6">
            <span className="border border-ink/40 px-2.5 py-1">SHEET 01</span>
            <span className="border border-ink/40 px-2.5 py-1">REV A</span>
            <span className="border border-ink/40 px-2.5 py-1">DWG. MOH-001</span>
          </div>

          <h1 className="font-display font-extrabold uppercase leading-[0.95] text-ink mb-5">
            <span className="block text-4xl sm:text-6xl lg:text-7xl">{first}</span>
            <span className="block text-4xl sm:text-6xl lg:text-7xl">
              <span className="bg-primary-500 inline-block px-3 pb-1 rotate-[-1deg]">{last}</span>
            </span>
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[3px] bg-primary-500" />
            <p className="font-mono text-sm sm:text-base font-bold uppercase tracking-[0.3em] text-primary-600">
              {highlighted}
            </p>
            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-ink-faint border border-ink/30 px-2 py-0.5">
              <span className="w-1.5 h-1.5 bg-primary-500" /> OPEN TO WORK
            </span>
          </div>

          <p className="text-ink-soft text-base sm:text-lg mb-9 max-w-xl leading-relaxed">
            {settings.hero_subtitle || profile?.bio || 'I design and build software systems — from spec to shipped product. Clean code, measurable results.'}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a href="#projects" className="btn-primary">
              View Work <FiArrowRight size={14} />
            </a>
            {profile?.resume_url && (
              <a href={profile.resume_url} target="_blank" rel="noreferrer" className="btn-ghost">
                <FiDownload size={14} className="text-primary-600" /> Resume
              </a>
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs font-semibold uppercase tracking-widest">
            {socials.map((s, i) => (
              <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="flex items-center gap-2 text-ink-soft hover:text-primary-600 transition-colors group">
                <span className="text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
                <s.icon size={14} className="group-hover:text-primary-600" />
                <span className="border-b border-dotted border-ink-soft/50 group-hover:border-primary-600">{s.label}</span>
              </a>
            ))}
          </div>
        </div>

        {showPlate && (
        <div className="hidden lg:block">
          <div className="card relative shadow-card border-2 border-ink/70 p-0">
            <span className="absolute -top-2 -left-2 text-primary-500" aria-hidden><FiPlus size={14} /></span>
            <span className="absolute -top-2 -right-2 text-primary-500" aria-hidden><FiPlus size={14} /></span>
            <span className="absolute -bottom-2 -left-2 text-primary-500" aria-hidden><FiPlus size={14} /></span>
            <span className="absolute -bottom-2 -right-2 text-primary-500" aria-hidden><FiPlus size={14} /></span>

            <div className="flex items-center justify-between px-4 py-3 bg-surface-900 border-b-2 border-ink/70 font-mono text-[11px] uppercase tracking-widest text-ink">
              <span className="min-w-0 truncate">{plateTitle}</span>
              <span className="text-ink-faint shrink-0">Sheet {plateSheet}</span>
            </div>

            <div className="relative bg-grid px-6 py-8 h-[340px] overflow-hidden">
              <div className="absolute inset-y-6 left-6 w-px border-l border-dashed border-ink/50" aria-hidden />
              <div className="absolute inset-y-6 right-6 w-px border-l border-dashed border-ink/50" aria-hidden />
              <div className="absolute inset-x-6 top-6 h-px border-t border-dashed border-ink/50" aria-hidden />
              <div className="absolute inset-x-6 bottom-6 h-px border-t border-dashed border-ink/50" aria-hidden />

              <div className="absolute top-2 left-8 font-mono text-[9px] uppercase tracking-widest text-ink-faint" aria-hidden>▲ {plateHeight}</div>

              <div className="relative h-full flex items-center justify-center">
                <span className="relative font-display font-extrabold text-[130px] leading-none text-primary-500/25 select-none">
                  {first[0]}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="block w-10 h-10 border-2 border-primary-600 rotate-45" aria-hidden />
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="block w-1 h-1 bg-primary-600 rounded-full" aria-hidden />
                  </span>
                </span>

                <div className="absolute right-8 top-1/2 -translate-y-1/2 max-w-[46%] space-y-2.5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink-faint">Core Stack</p>
                  {plateStack.map((line) => (
                    <p key={line} className="font-mono text-xs font-bold text-ink border-b border-ink/20 pb-1 break-words">{line}</p>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-widest text-ink-faint" aria-hidden>
                {plateTolerance}
              </div>
            </div>

            <div className="grid grid-cols-3 border-t-2 border-ink/70 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
              <div className="px-4 py-2.5 border-r border-ink/40">{plateScale}</div>
              <div className="px-4 py-2.5 border-r border-ink/40">{plateDims}</div>
              <div className="px-4 py-2.5">{plateRev}</div>
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}