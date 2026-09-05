import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import api from '../../../api/client';
import Modal from '../../../components/Modal';

const emptyForm = { company: '', position: '', description: '', location: '', start_date: '', end_date: '', is_current: false, sort_order: 0 };

export default function ExperienceManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchItems = async () => {
    try {
      const res = await api.get('/experience');
      setItems(res.data);
    } catch (err) {
      toast.error('Failed to load experience');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (item) => {
    setEditing(item);
    setForm({ ...item, start_date: (item.start_date || '').slice(0, 10), end_date: item.end_date ? item.end_date.slice(0, 10) : '' });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.company || !form.position || !form.start_date) return toast.error('Company, position and start date are required');
    const payload = { ...form, end_date: form.is_current ? null : form.end_date || null };
    try {
      if (editing) {
        await api.put(`/experience/${editing.id}`, payload);
        toast.success('Experience updated');
      } else {
        await api.post('/experience', payload);
        toast.success('Experience added');
      }
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      toast.error('Failed to save experience');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this experience?')) return;
    try {
      await api.delete(`/experience/${id}`);
      toast.success('Deleted');
      fetchItems();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="text-ink-soft">Loading...</div>;

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <p className="text-ink-soft text-sm">{items.length} entries</p>
        <button onClick={openAdd} className="btn-primary text-sm py-2"><FiPlus /> Add Experience</button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="card p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{item.position}</h3>
                <p className="text-primary-600 text-sm">{item.company}</p>
                <p className="text-xs text-ink-faint mt-1">
                  {new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {item.is_current || !item.end_date ? 'Present' : new Date(item.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  {item.location ? ` · ${item.location}` : ''}
                </p>
                {item.description && <p className="text-sm text-ink-soft mt-2">{item.description}</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(item)} className="p-2 text-ink-soft hover:text-primary-600"><FiEdit2 /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-ink-soft hover:text-red-400"><FiTrash2 /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Experience' : 'Add Experience'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label-field">Company</label>
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="label-field">Position</label>
              <input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="label-field">Start Date</label>
              <input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="label-field">End Date</label>
              <input type="date" value={form.end_date} disabled={form.is_current} onChange={(e) => setForm({ ...form, end_date: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="label-field">Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input-field" placeholder="City, Country" />
            </div>
          </div>
          <label className="flex items-center gap-3 bg-surface-800 p-3 rounded-lg">
            <input type="checkbox" checked={form.is_current} onChange={(e) => setForm({ ...form, is_current: e.target.checked, end_date: e.target.checked ? '' : form.end_date })} className="w-4 h-4" />
            <span className="text-sm text-ink-soft">I currently work here</span>
          </label>
          <div>
            <label className="label-field">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="4" className="input-field"></textarea>
          </div>
          <button type="submit" className="btn-primary w-full justify-center">{editing ? 'Update' : 'Add'} Experience</button>
        </form>
      </Modal>
    </div>
  );
}
