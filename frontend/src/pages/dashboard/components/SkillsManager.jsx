import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import api from '../../../api/client';
import Modal from '../../../components/Modal';

const emptyForm = { name: '', category: 'technical', proficiency: 80, icon: '', sort_order: 0 };

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      setSkills(res.data);
    } catch (err) {
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (skill) => {
    setEditing(skill);
    setForm({ name: skill.name, category: skill.category, proficiency: skill.proficiency, icon: skill.icon || '', sort_order: skill.sort_order || 0 });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return toast.error('Skill name is required');
    try {
      if (editing) {
        await api.put(`/skills/${editing.id}`, form);
        toast.success('Skill updated');
      } else {
        await api.post('/skills', form);
        toast.success('Skill added');
      }
      setModalOpen(false);
      fetchSkills();
    } catch (err) {
      toast.error('Failed to save skill');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await api.delete(`/skills/${id}`);
      toast.success('Skill deleted');
      fetchSkills();
    } catch (err) {
      toast.error('Failed to delete skill');
    }
  };

  const groups = {};
  skills.forEach((s) => {
    const c = s.category || 'technical';
    if (!groups[c]) groups[c] = [];
    groups[c].push(s);
  });

  if (loading) return <div className="text-slate-400">Loading...</div>;

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <p className="text-slate-400 text-sm">{skills.length} skills</p>
        <button onClick={openAdd} className="btn-primary text-sm py-2"><FiPlus /> Add Skill</button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(groups).map(([cat, items]) => (
          <div key={cat} className="card p-5">
            <h3 className="font-semibold mb-4 capitalize text-primary-400">{cat}</h3>
            <div className="space-y-3">
              {items.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{skill.name}</p>
                    <div className="h-1.5 bg-slate-700 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-primary-500 rounded-full" style={{ width: `${skill.proficiency}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button onClick={() => openEdit(skill)} className="p-2 text-slate-400 hover:text-primary-400"><FiEdit2 /></button>
                    <button onClick={() => handleDelete(skill.id)} className="p-2 text-slate-400 hover:text-red-400"><FiTrash2 /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Skill' : 'Add Skill'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-field">Skill Name</label>
            <input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="e.g. React, Node.js, Figma" />
          </div>
          <div>
            <label className="label-field">Category</label>
            <select name="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
              <option value="technical">Technical</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Database</option>
              <option value="tools">Tools</option>
              <option value="design">Design</option>
              <option value="soft">Soft Skills</option>
            </select>
          </div>
          <div>
            <label className="label-field">Proficiency: {form.proficiency}%</label>
            <input type="range" min="0" max="100" value={form.proficiency} onChange={(e) => setForm({ ...form, proficiency: +e.target.value })} className="w-full" />
          </div>
          <button type="submit" className="btn-primary w-full justify-center">{editing ? 'Update' : 'Add'} Skill</button>
        </form>
      </Modal>
    </div>
  );
}
