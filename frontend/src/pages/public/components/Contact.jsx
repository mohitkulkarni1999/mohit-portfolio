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
    profile?.email && { icon: FiMail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    profile?.phone && { icon: FiPhone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
    profile?.location && { icon: FiMapPin, label: 'Location', value: profile.location },
  ].filter(Boolean);

  return (
    <section id="contact" className="section-pad bg-surface-900/40">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Contact"
          title={settings.section_contact_heading || 'Get In Touch'}
          subtitle={settings.section_contact_subtitle}
        />

        <div className="mt-14 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-5 animate-slide-in-left">
            {contactItems.map((item) => (
              <div key={item.label} className="card-hover p-5 flex items-center gap-4">
                <span className="p-3 rounded-xl bg-primary-500/10 text-primary-400 shrink-0"><item.icon /></span>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-slate-200 hover:text-primary-300 transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-slate-200">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="card p-5 flex items-start gap-4">
              <span className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0"><FiClock /></span>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Response Time</p>
                <p className="text-slate-200">Usually within 24 hours</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-3 card p-7 sm:p-8 space-y-5 animate-slide-in-right">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="label-field">Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Your name" />
              </div>
              <div>
                <label className="label-field">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field" placeholder="you@email.com" />
              </div>
            </div>
            <div>
              <label className="label-field">Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange} className="input-field" placeholder="Project inquiry" />
            </div>
            <div>
              <label className="label-field">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows="6" className="input-field" placeholder="Tell me about your project..."></textarea>
            </div>
            <button type="submit" disabled={sending} className="btn-primary w-full">
              <FiSend /> {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
