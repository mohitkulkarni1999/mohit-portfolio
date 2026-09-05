import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';
import api from '../../../api/client';

const fields = [
  { key: 'full_name', label: 'Full Name', type: 'text' },
  { key: 'title', label: 'Professional Title', type: 'text' },
  { key: 'bio', label: 'Bio / About', type: 'textarea' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'github', label: 'GitHub URL', type: 'text' },
  { key: 'linkedin', label: 'LinkedIn URL', type: 'text' },
  { key: 'twitter', label: 'Twitter URL', type: 'text' },
  { key: 'website', label: 'Website', type: 'text' },
  { key: 'avatar_url', label: 'Avatar Image URL', type: 'text' },
  { key: 'resume_url', label: 'Resume URL', type: 'text' },
];

const emptyProfile = Object.fromEntries(fields.map((f) => [f.key, '']));

export default function ProfileManager() {
  const [form, setForm] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/profile').then((res) => setForm({ ...emptyProfile, ...res.data })).finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/profile', form);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-slate-400">Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6 animate-fade-in">
      <div className="card p-6">
        <h2 className="text-lg font-bold mb-4 text-primary-400">Basic Information</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.filter((f) => f.type === 'text').slice(0, 6).map((field) => (
            <div key={field.key}>
              <label className="label-field">{field.label}</label>
              <input name={field.key} value={form[field.key] || ''} onChange={handleChange} className="input-field" />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <label className="label-field">Bio</label>
          <textarea name="bio" value={form.bio || ''} onChange={handleChange} rows="4" className="input-field"></textarea>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-bold mb-4 text-primary-400">Social Links</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.filter((f) => ['github', 'linkedin', 'twitter', 'website'].includes(f.key)).map((field) => (
            <div key={field.key}>
              <label className="label-field">{field.label}</label>
              <input name={field.key} value={form[field.key] || ''} onChange={handleChange} className="input-field" placeholder="https://" />
            </div>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="label-field">Avatar Image URL</label>
            <input name="avatar_url" value={form.avatar_url || ''} onChange={handleChange} className="input-field" placeholder="https://" />
          </div>
          <div>
            <label className="label-field">Resume URL</label>
            <input name="resume_url" value={form.resume_url || ''} onChange={handleChange} className="input-field" placeholder="https://" />
          </div>
        </div>
      </div>

      <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
        <FiSave /> {saving ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
}
