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
    <section id="blog" className="relative overflow-hidden section-pad">
      <div className="container-custom relative">
        <SectionHeader
          eyebrow="publications 12"
          title={settings.section_blog_heading || 'From My Blog'}
          subtitle={settings.section_blog_subtitle}
        />

        <div className="mt-10 sm:mt-14 max-w-3xl mx-auto">
          <div className="flex items-center justify-between px-1 mb-4 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
            <span>Publications Index</span>
            <span>P-INDEX</span>
          </div>
          <div className="divide-y-2 divide-ink/15 border-2 border-ink/70 bg-surface-850 shadow-card">
            {posts.slice(0, 3).map((post, i) => (
              <a key={post.id} href="#blog" className="block group px-6 py-6 hover:bg-primary-500/5 transition-colors">
                <div className="flex flex-wrap items-center gap-3 text-xs text-ink-faint font-mono mb-2">
                  <span className="font-display font-extrabold text-primary-600 text-base">0{i + 1}</span>
                  <span className="flex items-center gap-1.5"><FiCalendar /> {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1.5"><FiClock /> {post.read_minutes} min read</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-extrabold uppercase text-ink mb-1.5 group-hover:text-primary-700 transition-colors break-words">
                  {post.title}
                </h3>
                {post.excerpt && <p className="text-ink-soft text-sm leading-relaxed mb-3 break-words">{post.excerpt}</p>}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags?.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="chip"><span className="w-1.5 h-1.5 bg-primary-600 rotate-45" /> {tag}</span>
                    ))}
                  </div>
                  <span className="text-primary-600 flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest">
                    read <FiArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}