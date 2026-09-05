import { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import api from '../../../api/client';
import SectionHeader from '../../../components/SectionHeader';

export default function Blog({ settings }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/blog').then((res) => {
      const published = (res.data || []).filter((p) => p.published);
      setPosts(published);
    });
  }, []);

  if (!posts.length) return null;

  return (
    <section id="blog" className="section-pad">
      <div className="container-custom">
        <SectionHeader
          eyebrow="ls ~/blog"
          title={settings.section_blog_heading || 'From My Blog'}
          subtitle={settings.section_blog_subtitle}
        />

        <div className="mt-14 max-w-3xl mx-auto">
          <div className="card overflow-hidden p-0">
            <div className="px-5 py-3 bg-surface-900/90 border-b border-surface-700/60 font-mono text-xs text-slate-500 flex items-center gap-2">
              <span className="text-primary-400">$</span> ls --latest ~/blog
            </div>
            <div className="divide-y divide-surface-700/50">
              {posts.slice(0, 3).map((post, i) => (
                <a key={post.id} href={`#blog`} className="block group px-6 py-5 hover:bg-surface-900/60 transition-colors animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono mb-2">
                    <span className="flex items-center gap-1.5"><FiCalendar /> {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1.5"><FiClock /> {post.read_minutes} min read</span>
                  </div>
                  <h3 className="font-mono text-lg font-bold text-white mb-1.5 group-hover:text-primary-300 transition-colors">
                    <span className="text-primary-400">▸</span> {post.title}
                  </h3>
                  {post.excerpt && <p className="text-slate-400 text-sm leading-relaxed mb-3">{post.excerpt}</p>}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags?.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="font-mono text-xs px-2 py-0.5 rounded bg-surface-900 text-slate-400 border border-surface-700">{tag}</span>
                      ))}
                    </div>
                    <span className="text-primary-400 flex items-center gap-1 font-mono text-xs group-hover:gap-2 transition-all">read_more <FiArrowRight size={12} /></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}