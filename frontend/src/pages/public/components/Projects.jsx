import { useState, useEffect } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import api from '../../../api/client';
import SectionHeader from '../../../components/SectionHeader';
import BlueprintBackground from '../../../components/BlueprintBackground';

export default function Projects({ settings }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then((res) => setProjects(res.data || []));
  }, []);

  if (!projects.length) return null;

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative overflow-hidden section-pad bg-surface-900/40">
      <BlueprintBackground variant="hero" />
      <div className="container-custom relative">
        <SectionHeader
          eyebrow="drawing index 06"
          title={settings.section_projects_heading || 'My Projects'}
          subtitle={settings.section_projects_subtitle}
        />

        {featured.length > 0 && (
          <div className="mt-14 grid lg:grid-cols-2 gap-6">
            {featured.slice(0, 4).map((project, i) => (
              <div key={project.id} className={`card border-2 border-ink/70 shadow-card p-0 group flex flex-col ${i % 2 === 1 ? 'lg:mt-12' : ''}`}>
                <div className="relative h-52 overflow-hidden border-b-2 border-ink/70">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-grid bg-surface-900 flex items-center justify-center">
                      <span className="font-display text-6xl font-extrabold text-primary-500/40 select-none">
                        {project.title[0]?.toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-ink/25" />
                  <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest bg-surface-950/80 border border-ink/30 px-2 py-1 text-ink">
                    DWG Nº {new Date().getFullYear()}-{String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    {project.featured && <span className="stamp !text-surface-950">Featured</span>}
                  </div>
                  <div className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-widest">
                    <span className="bg-surface-950/80 border border-ink/30 px-2 py-1 text-ink">scale: a0</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="font-display text-lg sm:text-xl font-extrabold uppercase text-ink leading-tight break-words">
                      {project.title}
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint shrink-0">SH. 0{i + 1}</span>
                  </div>
                  <p className="text-ink-soft text-sm mb-4 flex-1 leading-relaxed break-words">{project.description}</p>
                  {project.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint self-center">MATL:</span>
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="chip break-words">
                          <span className="w-1.5 h-1.5 bg-primary-600 rotate-45 shrink-0" /> {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3 pt-4 border-t-2 border-ink/70">
                    {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" className="btn-primary !px-4 !py-2 text-xs"><FiExternalLink /> demo</a>}
                    {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="btn-ghost !px-4 !py-2 text-xs"><FiGithub /> source</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {others.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between px-1 mb-4 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
              <span>Supplementary Sheets — B-series</span>
              <span>{String(others.length).padStart(2, '0')} ROWS</span>
            </div>
            <div className="divide-y-2 divide-ink/15 border-2 border-ink/70 bg-surface-850 shadow-card">
              {others.map((project, i) => (
                <div key={project.id} className="grid sm:grid-cols-[4rem_1fr_auto] gap-3 sm:gap-6 items-start px-5 py-5 group flex flex-col sm:flex-row">
                  <div className="flex items-center gap-2 sm:block">
                    <span className="font-display text-2xl font-extrabold text-primary-600/60">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-ink-faint sm:block">sheet b</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 font-mono mb-1">
                      <span className="w-2 h-2 bg-primary-500 rotate-45 shrink-0" />
                      <h3 className="font-display font-bold uppercase text-ink leading-tight break-words">{project.title}</h3>
                    </div>
                    <p className="text-ink-soft text-sm leading-relaxed break-words">{project.description}</p>
                    {project.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-3 font-mono text-xs">
                        <span className="text-ink-faint">MATL:</span>
                        {project.tags.slice(0, 5).map((tag, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1.5 text-ink-soft">
                            <span className="w-1.5 h-1.5 bg-primary-600 rotate-45" /> {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 sm:pt-1 font-mono text-xs shrink-0">
                    {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-primary-600 hover:text-primary-700 font-bold"><FiExternalLink /> demo</a>}
                    {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-ink-soft hover:text-primary-600"><FiGithub /> code</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}