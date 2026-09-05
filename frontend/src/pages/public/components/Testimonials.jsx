import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
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
    <section id="testimonials" className="relative overflow-hidden section-pad">
      <div className="container-custom relative">
        <SectionHeader
          eyebrow="reference sheet 11"
          title={settings.section_testimonials_heading || 'What People Say'}
          subtitle={settings.section_testimonials_subtitle}
        />

        <div className="mt-14 max-w-3xl mx-auto">
          <div className="card relative border-2 border-ink/70 border-dashed shadow-card p-0">
            <div className="flex items-center justify-between px-5 py-3 bg-surface-900 border-b-2 border-ink/70 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
              <span>Reference Sheet RS-0{index + 1}</span>
              <span>{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
            </div>

            <div className="p-8 sm:p-10">
              <span className="font-display text-7xl leading-none text-primary-500/30 select-none">"</span>
              <p className="font-display text-xl sm:text-2xl font-semibold text-ink leading-relaxed -mt-4 mb-8">
                {current.message}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-5 border-t-2 border-dashed border-ink/30">
                {current.avatar_url ? (
                  <img src={current.avatar_url} alt={current.name} className="w-12 h-12 object-cover border-2 border-ink/70" />
                ) : (
                  <span className="w-12 h-12 bg-primary-500/10 border-2 border-primary-600 text-primary-700 flex items-center justify-center font-mono font-bold text-sm">
                    {initials}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="font-display font-extrabold uppercase text-ink">{current.name}</p>
                  <p className="text-sm text-ink-faint font-mono truncate">
                    {current.role}
                    {current.company ? ` @ ${current.company}` : ''}
                  </p>
                </div>
                <div className="ml-auto font-mono text-xs text-primary-600 tracking-widest">
                  {'★'.repeat(current.rating || 5)}
                </div>
              </div>

              {items.length > 1 && (
                <div className="flex items-center justify-between gap-4 mt-8 pt-5 border-t border-ink/15">
                  <button onClick={prev} className="w-10 h-10 border-2 border-ink/60 text-ink hover:border-primary-600 hover:text-primary-600 transition-colors flex items-center justify-center"><FiChevronLeft /></button>
                  <div className="flex gap-2">
                    {items.map((_, i) => (
                      <button key={i} onClick={() => setIndex(i)} className={`transition-all ${i === index ? 'bg-primary-500 w-8 h-1.5' : 'bg-ink/20 w-3 h-1.5'}`} aria-label={`Go to reference ${i + 1}`} />
                    ))}
                  </div>
                  <button onClick={next} className="w-10 h-10 border-2 border-ink/60 text-ink hover:border-primary-600 hover:text-primary-600 transition-colors flex items-center justify-center"><FiChevronRight /></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}