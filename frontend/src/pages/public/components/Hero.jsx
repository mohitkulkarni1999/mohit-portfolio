import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

export default function Hero({ profile, settings }) {
  const highlighted = settings.hero_highlight || profile?.title || 'Software Developer';

  const codeSnippet = `const developer = {
  name: "${profile?.full_name || 'Mohit'}",
  role: "${highlighted}",
  passion: ["clean code", "scale", "impact"],
  hireable: () => true
};`;

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-hero-grad" />
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute -top-32 -right-20 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-primary-800/15 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="container-custom relative grid lg:grid-cols-2 gap-12 items-center py-16 w-full">
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-6 chip">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for opportunities
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-5">
            <span className="text-white">Hi, I'm</span>
            <br />
            <span className="text-gradient">{profile?.full_name || 'Mohit'}</span>
          </h1>
          <p className="font-mono text-primary-300 mb-4">&gt; {highlighted}</p>
          <p className="text-slate-400 text-lg mb-8 max-w-xl">
            {settings.hero_subtitle || profile?.bio || 'I build elegant, fast, and scalable web applications that solve real-world problems.'}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a href="#projects" className="btn-primary">
              View My Work <FiArrowRight />
            </a>
            {profile?.resume_url && (
              <a href={profile.resume_url} target="_blank" rel="noreferrer" className="btn-ghost">
                <FiDownload /> Resume
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 mt-10">
            {profile?.github && <a href={profile.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-lg border border-surface-700 text-slate-400 hover:text-primary-300 hover:border-primary-500/50 transition-all"><FiGithub /></a>}
            {profile?.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-lg border border-surface-700 text-slate-400 hover:text-primary-300 hover:border-primary-500/50 transition-all"><FiLinkedin /></a>}
            {profile?.twitter && <a href={profile.twitter} target="_blank" rel="noreferrer" className="p-2.5 rounded-lg border border-surface-700 text-slate-400 hover:text-primary-300 hover:border-primary-500/50 transition-all"><FiTwitter /></a>}
            {profile?.email && <a href={`mailto:${profile.email}`} className="p-2.5 rounded-lg border border-surface-700 text-slate-400 hover:text-primary-300 hover:border-primary-500/50 transition-all"><FiMail /></a>}
          </div>
        </div>

        <div className="hidden lg:block animate-slide-in-right">
          <div className="card relative overflow-hidden p-0 shadow-glow">
            <div className="flex items-center gap-2 px-4 py-3 bg-surface-900/80 border-b border-surface-700/60">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs text-slate-500 font-mono">developer.js</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed relative">
              <pre className="text-slate-300">{codeSnippet}</pre>
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary-500/10 to-transparent animate-scanner pointer-events-none" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-500/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
