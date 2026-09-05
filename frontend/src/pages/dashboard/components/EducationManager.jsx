import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import api from '../../../api/client';
import Modal from '../../../components/Modal';

const emptyForm = { institution: '', degree: '', field_of_study: '', start_date: '', end_date: '', grade: '', description: '', sort_order: 0 };

export default function EducationManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchItems = async () => {
    try {
      const res = await api.get('/education');
      setItems(res.data);
    } catch (err) {
      toast.error('Failed to load education');
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
    if (!form.institution || !form.degree || !form.start_date) return toast.error('Institution, degree and start date are required');
    try {
      if (editing) {
        await api.put(`/education/${editing.id}`, form);
        toast.success('Education updated');
      } else {
        await api.post('/education', form);
        toast.success('Education added');
      }
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      toast.error('Failed to save education');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this education entry?')) return;
    try {
      await api.delete(`/education/${id}`);
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
        <button onClick={openAdd} className="btn-primary text-sm py-2"><FiPlus /> Add Education</button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="card p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{item.degree}</h3>
                <p className="text-primary-600 text-sm">{item.institution}</p>
                <p className="text-xs text-ink-faint mt-1">
                  {new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {item.end_date ? new Date(item.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                </p>
                {(item.field_of_study || item.grade) && (
                  <p className="text-xs text-ink-soft mt-1">
                    {item.field_of_study && <>Field: {item.field_of_study}</>}
                    {item.field_of_study && item.grade && <span className="mx-2">·</span>}
                    {item.grade && <>Grade: {item.grade}</>}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(item)} className="p-2 text-ink-soft hover:text-primary-600"><FiEdit2 /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-ink-soft hover:text-red-400"><FiTrash2 /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Education' : 'Add Education'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-field">Institution</label>
            <input value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="label-field">Degree</label>
            <input value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} className="input-field" placeholder="B.Tech in Computer Science" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label-field">Field of Study</label>
              <input value={form.field_of_study} onChange={(e) => setForm({ ...form, field_of_study: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="label-field">Grade</label>
              <input value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className="input-field" placeholder="CGPA: 8.5" />
            </div>
            <div>
              <label className="label-field">Start Date</label>
              <input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="label-field">End Date (leave empty if ongoing)</label>
              <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} className="input-field" />
            </div>
          </div>
          <div>
            <label className="label-field">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="3" className="input-field"></textarea>
          </div>
          <button type="submit" className="btn-primary w-full justify-center">{editing ? 'Update' : 'Add'} Education</button>
        </form>
      </Modal>
    </div>
  );
}
