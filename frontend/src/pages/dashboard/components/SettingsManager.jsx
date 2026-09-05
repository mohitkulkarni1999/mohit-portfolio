import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiSave, FiEye, FiEyeOff, FiSettings } from 'react-icons/fi';
import api from '../../../api/client';

const SECTION_GROUPS = [
  { id: 'about', label: 'About' },
  { id: 'stats', label: 'Stats / Numbers' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'tools', label: 'Tools & Technologies' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

const LOCALE = {
  about: 'About', stats: 'Stats', skills: 'Skills', services: 'Services', projects: 'Projects',
  tools: 'Tools', experience: 'Experience', education: 'Education', certifications: 'Certifications',
  achievements: 'Achievements', testimonials: 'Testimonials', blog: 'Blog', contact: 'Contact',
};

export default function SettingsManager() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/settings')
      .then((res) => setSettings(res.data || {}))
      .finally(() => setLoading(false));
  }, []);

  const set = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave = async (values) => {
    setSaving(true);
    try {
      const res = await api.put('/settings', values);
      setSettings(res.data);
      toast.success('Settings saved successfully');
    } catch (err) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-ink-soft">Loading...</div>;

  return (
    <div className="space-y-8 animate-fade-in pb-40">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <FiSettings className="text-primary-600 text-xl" />
          <h2 className="text-lg font-bold">Section Manager</h2>
        </div>
        <p className="text-sm text-ink-soft mb-6 flex items-center gap-2">
          <span className="flex gap-1"><FiEye /> visible</span>
          <span className="mx-1 text-ink-faint">|</span>
          <span className="flex gap-1"><FiEyeOff /> hidden</span>
          <span className="mx-1 text-ink-faint">|</span>
          show/hide sections, drag ordering, and edit headings & subtitles below.
        </p>
      </div>

      <div className="space-y-5">
        {SECTION_GROUPS.map((section) => {
          const visible = settings[`show_${section.id}`] !== false;
          const order = settings[`order_${section.id}`];
          return (
            <div key={section.id} className={`card p-5 transition-colors ${visible ? 'border-primary-500/40' : 'opacity-80'}`}>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => { const v = !visible; handleSave({ [`show_${section.id}`]: v }); }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    visible ? 'bg-primary-500/10 text-primary-600 border border-primary-500/30 hover:bg-primary-500/20' : 'bg-surface-800 text-ink-faint border border-surface-700 hover:text-ink-soft'
                  }`}
                >
                  {visible ? <><FiEye /> Shown</> : <><FiEyeOff /> Hidden</>}
                </button>
                <div className="flex-1 min-w-[150px]">
                  <h3 className="font-semibold text-ink">{section.label}</h3>
                  <p className={`text-xs ${visible ? 'text-primary-600' : 'text-ink-faint'}`}>{visible ? 'Visible on website' : 'Hidden from website'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-ink-faint">Order:</span>
                  <input
                    type="number"
                    value={order ?? ''}
                    onChange={(e) => set(`order_${section.id}`, e.target.value === '' ? 0 : +e.target.value)}
                    className="w-16 px-2 py-1.5 bg-surface-900 border border-surface-700 rounded-lg text-sm text-ink text-center"
                  />
                  <button
                    className="p-2 rounded-lg border border-surface-700 text-ink-soft hover:text-primary-700 text-xs"
                    onClick={() => handleSave(Object.fromEntries(Object.entries({ [`order_${section.id}`]: order ?? 0 })))}
                    title="Save order"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-surface-700/60">
                <div>
                  <label className="label-field">Section Heading</label>
                  <div className="flex gap-2">
                    <input
                      className="input-field"
                      value={settings[`section_${section.id}_heading`] || ''}
                      onChange={(e) => set(`section_${section.id}_heading`, e.target.value)}
                    />
                    <button className="btn-primary !px-4 text-xs shrink-0" onClick={() => handleSave({ [`section_${section.id}_heading`]: settings[`section_${section.id}_heading`] })}>
                      <FiSave />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="label-field">Section Subtitle</label>
                  <div className="flex gap-2">
                    <input
                      className="input-field"
                      value={settings[`section_${section.id}_subtitle`] || ''}
                      onChange={(e) => set(`section_${section.id}_subtitle`, e.target.value)}
                    />
                    <button className="btn-primary !px-4 text-xs shrink-0" onClick={() => handleSave({ [`section_${section.id}_subtitle`]: settings[`section_${section.id}_subtitle`] })}>
                      <FiSave />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <BrandingCard settings={settings} set={set} handleSave={handleSave} saving={saving} />
      <HeroCard settings={settings} set={set} handleSave={handleSave} saving={saving} />
    </div>
  );
}

function BrandingCard({ settings, set, handleSave, saving }) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-5">
        <FiSettings className="text-primary-600 text-xl" />
        <h2 className="text-lg font-bold">Site Branding</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label-field">Site Title (browser tab)</label>
          <input className="input-field" value={settings.site_title || ''} onChange={(e) => set('site_title', e.target.value)} />
        </div>
        <div>
          <label className="label-field">SEO Description</label>
          <input className="input-field" value={settings.seo_description || ''} onChange={(e) => set('seo_description', e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="label-field">Site Tagline</label>
          <input className="input-field" value={settings.site_tagline || ''} onChange={(e) => set('site_tagline', e.target.value)} />
        </div>
      </div>
      <button className="btn-primary mt-5" disabled={saving} onClick={() => handleSave({ site_title: settings.site_title, seo_description: settings.seo_description, site_tagline: settings.site_tagline })}>
        <FiSave /> {saving ? 'Saving...' : 'Save Branding'}
      </button>
    </div>
  );
}

function HeroCard({ settings, set, handleSave, saving }) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-5">
        <FiSettings className="text-primary-600 text-xl" />
        <h2 className="text-lg font-bold">Hero Section</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label-field">Hero Heading</label>
          <input className="input-field" value={settings.hero_heading || ''} onChange={(e) => set('hero_heading', e.target.value)} />
        </div>
        <div>
          <label className="label-field">Hero Highlight (accented text)</label>
          <input className="input-field" value={settings.hero_highlight || ''} onChange={(e) => set('hero_highlight', e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="label-field">Hero Subtitle</label>
          <textarea className="input-field" rows="2" value={settings.hero_subtitle || ''} onChange={(e) => set('hero_subtitle', e.target.value)}></textarea>
        </div>
      </div>
      <button className="btn-primary mt-5" disabled={saving} onClick={() => handleSave({ hero_heading: settings.hero_heading, hero_highlight: settings.hero_highlight, hero_subtitle: settings.hero_subtitle })}>
        <FiSave /> {saving ? 'Saving...' : 'Save Hero'}
      </button>
    </div>
  );
}
