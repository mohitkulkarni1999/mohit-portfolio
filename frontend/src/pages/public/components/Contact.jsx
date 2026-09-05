import { useState } from 'react';
import { toast } from 'react-toastify';
import { FiMail, FiMapPin, FiPhone, FiSend, FiClock } from 'react-icons/fi';
import api from '../../../api/client';
import SectionHeader from '../../../components/SectionHeader';

export default function Contact({ profile, settings }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error('Please fill in name, email and message');
    setSending(true);
    try {
      await api.post('/messages', form);
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const contactItems = [
    profile?.email && { icon: FiMail, label: 'mail', value: profile.email, href: `mailto:${profile.email}` },
    profile?.phone && { icon: FiPhone, label: 'phone', value: profile.phone, href: `tel:${profile.phone}` },
    profile?.location && { icon: FiMapPin, label: 'location', value: profile.location },
  ].filter(Boolean);

  return (
    <section id="contact" className="section-pad bg-surface-900/40">
      <div className="container-custom">
        <SectionHeader
          eyebrow="connect --secure"
          title={settings.section_contact_heading || 'Get In Touch'}
          subtitle={settings.section_contact_subtitle}
        />

        <div className="mt-14 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4 animate-slide-in-left font-mono">
            <p className="text-xs text-slate-600 mb-2">
              <span className="text-primary-400">$</span> cat contacts.conf
            </p>
            {contactItems.map((item) => (
              <div key={item.label} className="card p-4 flex items-center gap-4 hover:border-primary-500/40 transition-colors">
                <span className="p-2.5 rounded-md bg-primary-500/10 text-primary-400 shrink-0 border border-primary-500/20"><item.icon size={16} /></span>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">{item.label}:</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-slate-200 hover:text-primary-300 transition-colors truncate block">{item.value}</a>
                  ) : (
                    <p className="text-sm text-slate-200 truncate">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="card p-4 flex items-center gap-4">
              <span className="p-2.5 rounded-md bg-emerald-500/10 text-emerald-400 shrink-0 border border-emerald-500/20"><FiClock size={16} /></span>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">response_time</p>
                <p className="text-sm text-emerald-300">&lt; 24h</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-3 card overflow-hidden p-0 animate-slide-in-right">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-900/90 border-b border-surface-700/60">
              <span className="terminal-dots">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </span>
              <span className="ml-3 text-xs text-slate-500 font-mono">contact@mohit.dev: ssh -p 443 session</span>
            </div>

            <div className="p-6 sm:p-8 space-y-5 font-mono">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-field"><span className="text-primary-400">$</span> name:</label>
                  <input name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="John Doe" />
                </div>
                <div>
                  <label className="label-field"><span className="text-primary-400">$</span> email:</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field" placeholder="you@email.com" />
                </div>
              </div>
              <div>
                <label className="label-field"><span className="text-primary-400">$</span> subject:</label>
                <input name="subject" value={form.subject} onChange={handleChange} className="input-field" placeholder="project-inquiry" />
              </div>
              <div>
                <label className="label-field"><span className="text-primary-400">$</span> message:</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows="6" className="input-field" placeholder="tell me about your project..."></textarea>
              </div>
              <button type="submit" disabled={sending} className="btn-primary w-full font-mono">
                <FiSend className="text-surface-950" /> {sending ? './sending...' : './send_message --now'}
              </button>
              <p className="text-xs text-slate-600 text-center">encrypted end-to-end · usually replies in &lt; 24h</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}