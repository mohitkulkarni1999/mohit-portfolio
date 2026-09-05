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
          eyebrow="Blog"
          title={settings.section_blog_heading || 'From My Blog'}
          subtitle={settings.section_blog_subtitle}
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post, i) => (
            <a key={post.id} href={`#blog`} className="card-hover group overflow-hidden block animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              {post.cover_image && (
                <div className="h-44 overflow-hidden">
                  <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              )}
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1.5"><FiCalendar /> {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1.5"><FiClock /> {post.read_minutes} min read</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">{post.title}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags?.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-surface-800 text-slate-400">{tag}</span>
                    ))}
                  </div>
                  <span className="text-primary-400 flex items-center gap-1 text-sm group-hover:gap-2 transition-all">Read <FiArrowRight /></span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
