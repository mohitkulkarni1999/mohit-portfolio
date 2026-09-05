import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiStar } from 'react-icons/fi';
import api from '../../../api/client';
import Modal from '../../../components/Modal';

const emptyForm = {
  title: '', description: '', long_description: '', image_url: '',
  demo_url: '', github_url: '', tags: '', featured: false, sort_order: 0
};

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (p) => {
    setEditing(p);
    setForm({ ...p, tags: p.tags?.join(', ') || '' });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return toast.error('Project title is required');
    const payload = { ...form, tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [] };
    try {
      if (editing) {
        await api.put(`/projects/${editing.id}`, payload);
        toast.success('Project updated');
      } else {
        await api.post('/projects', payload);
        toast.success('Project added');
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      toast.error('Failed to save project');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted');
      fetchProjects();
    } catch (err) {
      toast.error('Failed to delete project');
    }
  };

  const toggleFeatured = async (p) => {
    try {
      await api.put(`/projects/${p.id}`, { ...p, tags: p.tags || [], featured: !p.featured });
      fetchProjects();
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  if (loading) return <div className="text-slate-400">Loading...</div>;

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <p className="text-slate-400 text-sm">{projects.length} projects</p>
        <button onClick={openAdd} className="btn-primary text-sm py-2"><FiPlus /> Add Project</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p) => (
          <div key={p.id} className="card overflow-hidden hover:border-primary-500/50 transition-colors">
            {p.image_url && (
              <div className="h-40 bg-slate-800 overflow-hidden">
                <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{p.title}</h3>
                <button onClick={() => toggleFeatured(p)} className={`${p.featured ? 'text-yellow-400' : 'text-slate-600 hover:text-slate-400'}`} title="Toggle featured">
                  <FiStar />
                </button>
              </div>
              <p className="text-sm text-slate-400 line-clamp-2 mb-3">{p.description}</p>
              <div className="flex justify-end gap-2">
                <button onClick={() => openEdit(p)} className="px-3 py-1.5 text-xs bg-slate-800 text-slate-300 rounded hover:bg-slate-700"><FiEdit2 className="inline mr-1" />Edit</button>
                <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 text-xs bg-red-500/10 text-red-400 rounded hover:bg-red-500/20"><FiTrash2 className="inline mr-1" />Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Project' : 'Add Project'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-field">Title</label>
            <input name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="label-field">Short Description</label>
            <textarea name="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="2" className="input-field"></textarea>
          </div>
          <div>
            <label className="label-field">Long Description</label>
            <textarea name="long_description" value={form.long_description} onChange={(e) => setForm({ ...form, long_description: e.target.value })} rows="3" className="input-field"></textarea>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label-field">Image URL</label>
              <input name="image_url" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="input-field" placeholder="https://" />
            </div>
            <div>
              <label className="label-field">Tags (comma separated)</label>
              <input name="tags" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="input-field" placeholder="React, Node, PostgreSQL" />
            </div>
            <div>
              <label className="label-field">Demo URL</label>
              <input name="demo_url" value={form.demo_url} onChange={(e) => setForm({ ...form, demo_url: e.target.value })} className="input-field" placeholder="https://" />
            </div>
            <div>
              <label className="label-field">GitHub URL</label>
              <input name="github_url" value={form.github_url} onChange={(e) => setForm({ ...form, github_url: e.target.value })} className="input-field" placeholder="https://" />
            </div>
          </div>
          <label className="flex items-center gap-3 bg-slate-800 p-3 rounded-lg">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4" />
            <span className="text-sm text-slate-300">Featured project (shown prominently)</span>
          </label>
          <button type="submit" className="btn-primary w-full justify-center">{editing ? 'Update' : 'Add'} Project</button>
        </form>
      </Modal>
    </div>
  );
}
