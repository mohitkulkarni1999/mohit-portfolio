import { useState, useEffect } from 'react';
import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi';
import api from '../../../api/client';
import SectionHeader from '../../../components/SectionHeader';

export default function Projects({ settings }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then((res) => setProjects(res.data || []));
  }, []);

  if (!projects.length) return null;

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-pad bg-surface-900/40">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Portfolio"
          title={settings.section_projects_heading || 'My Projects'}
          subtitle={settings.section_projects_subtitle}
        />

        {featured.length > 0 && (
          <div className="mt-14 grid lg:grid-cols-2 gap-6">
            {featured.slice(0, 4).map((project, i) => (
              <div key={project.id} className={`group card overflow-hidden animate-slide-up ${i % 2 === 1 ? 'lg:mt-12' : ''}`} style={{ animationDelay: `${i * 100}ms` }}>
                <div className="relative h-56 overflow-hidden">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-surface-800 to-surface-900 flex items-center justify-center">
                      <span className="font-display text-5xl text-primary-500/40">{project.title[0]}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {project.featured && <span className="chip !bg-yellow-500/10 !text-yellow-300 !border-yellow-500/30"><FiStar /> Featured</span>}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                  {project.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs px-2.5 py-1 rounded-full bg-surface-800 text-slate-300 border border-surface-700">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-3">
                    {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" className="btn-primary !px-4 !py-2 text-sm"><FiExternalLink /> Live Demo</a>}
                    {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" className="btn-ghost !px-4 !py-2 text-sm"><FiGithub /> Code</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {others.length > 0 && (
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((project, i) => (
              <div key={project.id} className="card-hover p-6 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-lg font-semibold text-white">{project.title}</h3>
                  {project.featured && <FiStar className="text-yellow-400" />}
                </div>
                <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                {project.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 5).map((tag, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-surface-800 text-slate-400">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="flex gap-4">
                  {project.demo_url && <a href={project.demo_url} className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300"><FiExternalLink /> Demo</a>}
                  {project.github_url && <a href={project.github_url} className="flex items-center gap-1 text-sm text-slate-400 hover:text-primary-300"><FiGithub /> Code</a>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
