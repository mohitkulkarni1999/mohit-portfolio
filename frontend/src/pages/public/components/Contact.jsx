import { useState } from 'react';
import { toast } from 'react-toastify';
import { FiMail, FiMapPin, FiPhone, FiSend, FiClock, FiPlus } from 'react-icons/fi';
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
          eyebrow="transmittal sheet 13"
          title={settings.section_contact_heading || 'Get In Touch'}
          subtitle={settings.section_contact_subtitle}
        />

        <div className="mt-14 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">Contact Points — CP.LIST</p>
            {contactItems.map((item, i) => (
              <div key={item.label} className="card border-2 border-ink/70 shadow-card p-0">
                <div className="flex items-center gap-4 p-4">
                  <span className="relative w-10 h-10 bg-primary-500/10 border border-primary-600 text-primary-600 flex items-center justify-center shrink-0 group-hover:bg-primary-500 group-hover:text-ink transition-colors">
                    <item.icon size={16} />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary-500 rotate-45" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-ink-faint uppercase tracking-wider font-mono">{item.label} <span className="text-ink-faint/60">· CP-0{i + 1}</span>:</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-ink hover:text-primary-700 transition-colors truncate block font-mono font-semibold">{item.value}</a>
                    ) : (
                      <p className="text-sm text-ink truncate font-mono font-semibold">{item.value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="card border-2 border-dashed border-primary-600/60 shadow-card p-0">
              <div className="flex items-center gap-4 p-4">
                <span className="w-10 h-10 bg-primary-500 border border-ink flex items-center justify-center text-ink shrink-0"><FiClock size={16} /></span>
                <div>
                  <p className="text-xs text-ink-faint uppercase tracking-wider font-mono">response window</p>
                  <p className="text-sm text-primary-700 font-mono font-bold">&lt; 24 HRS</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-3 card relative shadow-card p-0 border-2 border-ink/70">
            <span className="absolute -top-2 -left-2 text-primary-500" aria-hidden><FiPlus size={14} /></span>
            <span className="absolute -bottom-2 -right-2 text-primary-500" aria-hidden><FiPlus size={14} /></span>
            <div className="flex items-center justify-between px-5 py-3 bg-surface-900 border-b-2 border-ink/70 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
              <span>Transmittal Form — T-01</span>
              <span className="text-primary-600 font-bold">[incoming]</span>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-field"><span className="text-primary-600">□</span> name <span className="text-primary-600">*</span>:</label>
                  <input name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="John Doe" />
                </div>
                <div>
                  <label className="label-field"><span className="text-primary-600">□</span> email <span className="text-primary-600">*</span>:</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field" placeholder="you@email.com" />
                </div>
              </div>
              <div>
                <label className="label-field"><span className="text-primary-600">□</span> subject:</label>
                <input name="subject" value={form.subject} onChange={handleChange} className="input-field" placeholder="project-inquiry" />
              </div>
              <div>
                <label className="label-field"><span className="text-primary-600">□</span> message <span className="text-primary-600">*</span>:</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows="6" className="input-field" placeholder="describe the project / revision..."></textarea>
              </div>
              <button type="submit" disabled={sending} className="btn-primary w-full">
                <FiSend className="text-primary-700" /> {sending ? 'in transit...' : 'transmit message →'}
              </button>
              <p className="text-xs text-ink-faint text-center font-mono uppercase tracking-widest">checked & approved · replies &lt; 24h</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}