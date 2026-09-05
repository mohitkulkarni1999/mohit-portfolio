import { useState, useEffect } from 'react';
import { FiExternalLink, FiGithub, FiStar, FiFolder } from 'react-icons/fi';
import api from '../../../api/client';
import SectionHeader from '../../../components/SectionHeader';

const TAG_COLORS = [
  'bg-emerald-400',
  'bg-amber-400',
  'bg-sky-400',
  'bg-rose-400',
  'bg-violet-400',
  'bg-orange-400',
  'bg-teal-400',
  'bg-fuchsia-400',
];

export default function Projects({ settings }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then((res) => setProjects(res.data || []));
  }, []);

  if (!projects.length) return null;

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  const colorFor = (i) => TAG_COLORS[i % TAG_COLORS.length];

  return (
    <section id="projects" className="section-pad bg-surface-900/40">
      <div className="container-custom">
        <SectionHeader
          eyebrow="repos --all"
          title={settings.section_projects_heading || 'My Projects'}
          subtitle={settings.section_projects_subtitle}
        />

        {featured.length > 0 && (
          <div className="mt-14 grid lg:grid-cols-2 gap-6">
            {featured.slice(0, 4).map((project, i) => (
              <div key={project.id} className={`group card overflow-hidden animate-slide-up flex flex-col ${i % 2 === 1 ? 'lg:mt-12' : ''}`} style={{ animationDelay: `${i * 100}ms` }}>
                <div className="relative h-52 overflow-hidden">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-surface-800 to-surface-900 flex items-center justify-center">
                      <span className="font-mono text-5xl text-primary-500/40">{'{ }'}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/20 to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-300 bg-surface-950/70 border border-surface-700/60 rounded-md px-2.5 py-1 backdrop-blur max-w-[70%] truncate">
                      <FiFolder className="text-primary-400 shrink-0" /> {project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                    </span>
                    {project.featured && <span className="chip !border-amber-500/30 !text-amber-300 !bg-amber-500/10 shrink-0"><FiStar /> featured</span>}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-mono text-base sm:text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors break-words">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 flex-1 leading-relaxed break-words">{project.description}</p>
                  {project.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-md bg-surface-900 text-slate-300 border border-surface-700 break-words">
                          <span className={`w-2 h-2 rounded-full ${colorFor(idx)} shrink-0`} /> {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-surface-700/50">
                    {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" className="btn-primary !px-4 !py-2 text-xs"><FiExternalLink className="text-surface-950" /> demo</a>}
                    {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="btn-ghost !px-4 !py-2 text-xs"><FiGithub /> source</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {others.length > 0 && (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {others.map((project, i) => (
              <div key={project.id} className="card hover:border-primary-500/40 hover:shadow-glow transition-all p-5 animate-slide-up flex flex-col" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 font-mono min-w-0">
                    <span className="text-yellow-400 shrink-0"><FiFolder size={16} /></span>
                    <span className="text-slate-200 font-semibold truncate">{project.title}</span>
                  </div>
                  {project.featured && <FiStar className="text-amber-400 shrink-0" />}
                </div>
                <p className="text-slate-400 text-sm mb-5 flex-1 leading-relaxed break-words">{project.description}</p>
                {project.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-xs">
                    {project.tags.slice(0, 5).map((tag, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 text-slate-400">
                        <span className={`w-2 h-2 rounded-full ${colorFor(idx)}`} /> {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 pt-4 border-t border-surface-700/50 font-mono text-xs">
                  {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-primary-400 hover:text-primary-300"><FiExternalLink /> demo</a>}
                  {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-400 hover:text-primary-300"><FiGithub /> code</a>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}