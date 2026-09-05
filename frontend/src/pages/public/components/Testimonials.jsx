import { useState, useEffect } from 'react';
import { FiStar, FiMessageCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../../api/client';
import SectionHeader from '../../../components/SectionHeader';

export default function Testimonials({ settings }) {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    api.get('/testimonials').then((res) => setItems(res.data || []));
  }, []);

  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [items.length]);

  if (!items.length) return null;

  const current = items[index];
  const initials = (current.name || '?').split(' ').map((w) => w[0]).slice(0, 2).join('');

  const prev = () => setIndex((index - 1 + items.length) % items.length);
  const next = () => setIndex((index + 1) % items.length);

  return (
    <section id="testimonials" className="section-pad bg-surface-900/40">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Testimonials"
          title={settings.section_testimonials_heading || 'What People Say'}
          subtitle={settings.section_testimonials_subtitle}
        />

        <div className="mt-14 max-w-3xl mx-auto">
          <div className="card relative p-8 sm:p-10 text-center overflow-hidden">
            <FiMessageCircle className="absolute top-6 left-6 text-primary-500/20 text-4xl" />
            <span className="absolute top-6 right-6 text-6xl text-primary-500/10">“</span>

            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: current.rating || 5 }).map((_, i) => (
                <FiStar key={i} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            <p className="text-slate-300 text-lg leading-relaxed mb-8">"{current.message}"</p>

            <div className="flex items-center justify-center gap-4">
              {current.avatar_url ? (
                <img src={current.avatar_url} alt={current.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-primary-500/40" />
              ) : (
                <span className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold">
                  {initials}
                </span>
              )}
              <div className="text-left">
                <p className="font-semibold text-white">{current.name}</p>
                <p className="text-sm text-slate-500">
                  {current.role}
                  {current.company ? ` · ${current.company}` : ''}
                </p>
              </div>
            </div>

            {items.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button onClick={prev} className="p-2 rounded-lg border border-surface-700 text-slate-400 hover:text-primary-300 hover:border-primary-500/50 transition-colors"><FiChevronLeft /></button>
                <div className="flex gap-2">
                  {items.map((_, i) => (
                    <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-primary-500 w-5' : 'bg-surface-700'}`} />
                  ))}
                </div>
                <button onClick={next} className="p-2 rounded-lg border border-surface-700 text-slate-400 hover:text-primary-300 hover:border-primary-500/50 transition-colors"><FiChevronRight /></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
