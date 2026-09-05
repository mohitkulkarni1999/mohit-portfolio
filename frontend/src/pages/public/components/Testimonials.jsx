import { useState, useEffect } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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
          eyebrow="echo $PEER_FEEDBACK"
          title={settings.section_testimonials_heading || 'What People Say'}
          subtitle={settings.section_testimonials_subtitle}
        />

        <div className="mt-14 max-w-3xl mx-auto">
          <div className="card overflow-hidden p-0">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-900/90 border-b border-surface-700/60">
              <span className="terminal-dots">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </span>
              <span className="ml-3 text-xs text-slate-500 font-mono">testimonials@portfolio: ~/reviews</span>
            </div>

            <div className="p-7 sm:p-10 font-mono">
              <p className="text-xs text-slate-600 mb-4">
                <span className="text-primary-400">$</span> cat #{`${index + 1}`}.txt
              </p>

              <div className="flex justify-start gap-1 mb-5">
                {Array.from({ length: current.rating || 5 }).map((_, i) => (
                  <FiStar key={i} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-slate-200 text-lg leading-relaxed mb-8">
                <span className="text-amber-400">"</span>{current.message}<span className="text-amber-400">"</span>
              </p>

              <div className="flex items-center gap-4">
                {current.avatar_url ? (
                  <img src={current.avatar_url} alt={current.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-500/40" />
                ) : (
                  <span className="w-12 h-12 rounded-lg bg-surface-900 border border-primary-500/30 flex items-center justify-center text-primary-300 font-mono font-bold text-sm">
                    {initials}
                  </span>
                )}
                <div>
                  <p className="font-mono font-bold text-white">
                    <span className="text-primary-400">@</span>{current.name.toLowerCase().replace(/\s+/g, '_')}
                  </p>
                  <p className="text-sm text-slate-500 font-mono">
                    {current.role}
                    {current.company ? ` @ ${current.company}` : ''}
                  </p>
                </div>
              </div>

              {items.length > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-surface-700/50">
                  <button onClick={prev} className="p-2 rounded-md border border-surface-700 text-slate-400 hover:text-primary-300 hover:border-primary-500/50 transition-colors"><FiChevronLeft /></button>
                  <div className="flex gap-2">
                    {items.map((_, i) => (
                      <button key={i} onClick={() => setIndex(i)} className={`h-1.5 rounded-full transition-all ${i === index ? 'bg-primary-400 w-5' : 'bg-surface-700'}`} />
                    ))}
                  </div>
                  <button onClick={next} className="p-2 rounded-md border border-surface-700 text-slate-400 hover:text-primary-300 hover:border-primary-500/50 transition-colors"><FiChevronRight /></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}