import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Hero({ profile, settings }) {
  const highlighted = settings.hero_highlight || profile?.title || 'Software Developer';

  const codeLines = [
    { type: 'keyword', text: 'const' },
    { type: 'space', text: ' ' },
    { type: 'var', text: 'developer' },
    { type: 'space', text: ' ' },
    { type: 'op', text: '= {' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-28">
      <div className="absolute inset-0 bg-hero-grad" />
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute -top-32 -right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-primary-700/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="container-custom relative grid lg:grid-cols-2 gap-12 items-center py-16 w-full">
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2.5 mb-6 font-mono text-sm">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-primary-300">[system ready]</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">available for opportunities</span>
          </div>

          <div className="font-mono text-sm text-slate-500 mb-4">
            <span className="text-primary-400">$</span> whoami
          </div>

          <h1 className="font-mono text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4">
            <span className="text-slate-400 block text-lg sm:text-xl mb-2">&gt; hi, I'm</span>
            <span className="text-gradient">{profile?.full_name || 'Mohit Kulkarni'}</span>
          </h1>

          <p className="font-mono text-primary-300 mb-5 text-sm sm:text-base">
            <span className="text-amber-400">export const </span>role <span className="text-slate-500">=</span> <span className="text-amber-300">"{highlighted}"</span>
            <span className="cursor-blink text-primary-400">_</span>
          </p>

          <p className="text-slate-400 text-base sm:text-lg mb-8 max-w-xl leading-relaxed">
            {settings.hero_subtitle || profile?.bio || 'I build elegant, fast, and scalable web applications that solve real-world problems.'}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a href="#projects" className="btn-primary">
              <span className="text-surface-950">$ ./view_work</span>
              <FiArrowRight className="text-surface-950" />
            </a>
            {profile?.resume_url && (
              <a href={profile.resume_url} target="_blank" rel="noreferrer" className="btn-ghost">
                <FiDownload className="text-amber-400" /> resume --download
              </a>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10 font-mono text-sm">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-primary-300 transition-colors">
                <FiGithub /> github
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-primary-300 transition-colors">
                <FiLinkedin /> linkedin
              </a>
            )}
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-slate-400 hover:text-primary-300 transition-colors">
                <FiMail /> email me
              </a>
            )}
          </div>
        </div>

        <div className="hidden lg:block animate-slide-in-right">
          <div className="card relative overflow-hidden p-0 shadow-glow">
            <div className="flex items-center gap-2 px-4 py-3 bg-surface-900/90 border-b border-surface-700/60">
              <span className="terminal-dots">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </span>
              <span className="ml-3 text-xs text-slate-500 font-mono">mohit@portfolio: ~/repl</span>
            </div>

            <div className="p-6 font-mono text-sm leading-[1.9] relative">
              <pre className="text-slate-300 overflow-hidden">
                <span className="text-primary-400">$ </span><span className="text-amber-300">node</span> developer.js
                {'\n'}
                {codeLines.map((tok, i) => (
                  <span key={i} className={
                    tok.type === 'keyword' ? 'text-emerald-400'
                    : tok.type === 'var' ? 'text-primary-300'
                    : tok.type === 'op' ? 'text-slate-400'
                    : 'text-slate-500'
                  }>{tok.text}</span>
                ))}
                {'\n'}
                <span className="text-slate-500">  name:</span> <span className="text-amber-300">"{profile?.full_name || 'Mohit'}"</span>,
                {'\n'}
                <span className="text-slate-500">  role:</span> <span className="text-amber-300">"{highlighted}"</span>,
                {'\n'}
                <span className="text-slate-500">  stack:</span> [<span className="text-primary-300">'React'</span>, <span className="text-primary-300">'Node'</span>, <span className="text-primary-300">'SQL'</span>, <span className="text-primary-300">'C#'</span>],
                {'\n'}
                <span className="text-slate-500">  open_to_work:</span> <span className="text-emerald-400">true</span>,
                {'\n'}
                <span className="text-slate-500">  ready:</span> <span className="text-emerald-400">()</span> <span className="text-amber-300">=&gt;</span> <span className="text-emerald-400">true</span>,
                {'\n'}
                <span className="text-slate-500">{'};'}</span>
                {'\n'}
                <span className="text-primary-400">$ </span><span className="cursor-blink text-primary-300">▍</span>
              </pre>
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-primary-400/5 to-transparent animate-scanner pointer-events-none" />
            </div>

            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-primary-500/15 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}