import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import api from '../../../api/client';
import Modal from '../../../components/Modal';

const FIELD_COMPONENTS = {
  text: ({ field, value, onChange }) => (
    <input className="input-field" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />
  ),
  textarea: ({ field, value, onChange }) => (
    <textarea className="input-field" rows={field.rows || 4} value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder}></textarea>
  ),
  date: ({ field, value, onChange }) => (
    <input type="date" className="input-field" value={value ? String(value).slice(0, 10) : ''} onChange={(e) => onChange(e.target.value)} />
  ),
  number: ({ field, value, onChange }) => (
    <input type="number" className="input-field" value={value ?? ''} onChange={(e) => onChange(e.target.value === '' ? '' : +e.target.value)} />
  ),
  select: ({ field, value, onChange }) => (
    <select className="input-field" value={value || ''} onChange={(e) => onChange(e.target.value)}>
      {field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  ),
  check: ({ field, value, onChange }) => (
    <label className="flex items-center gap-3 bg-surface-900 p-3 rounded-xl cursor-pointer">
      <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="w-4 h-4 accent-primary-500" />
      <span className="text-sm text-slate-300">{field.label}</span>
    </label>
  ),
};

export default function CrudManager({ endpoint, title, columns, summary, icon: Icon }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const emptyForm = () => Object.fromEntries(columns.map((c) => [c.key, c.default ?? (c.type === 'number' ? 0 : c.type === 'check' ? false : c.type === 'date' ? '' : '')]));

  const fetchItems = async () => {
    try {
      const res = await api.get(endpoint);
      setItems(res.data);
    } catch (err) {
      toast.error(`Failed to load ${title.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm());
    setOpen(true);
  };
  const openEdit = (item) => {
    setEditing(item);
    const f = { ...emptyForm(), ...item };
    columns.forEach((c) => {
      if (c.split && Array.isArray(f[c.key])) f[c.key] = f[c.key].join(', ');
    });
    setForm(f);
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const required = columns.filter((c) => c.required);
    for (const c of required) {
      if (!form[c.key]) return toast.error(`${c.label} is required`);
    }
    const payload = { ...form };
    columns.forEach((c) => {
      if (c.split && typeof payload[c.key] === 'string') {
        payload[c.key] = payload[c.key].split(',').map((t) => t.trim()).filter(Boolean);
      }
    });
    setSaving(true);
    try {
      if (editing) {
        await api.put(`${endpoint}/${editing.id}`, payload);
        toast.success(`${title} updated`);
      } else {
        await api.post(endpoint, payload);
        toast.success(`${title} added`);
      }
      setOpen(false);
      fetchItems();
    } catch (err) {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    try {
      await api.delete(`${endpoint}/${id}`);
      toast.success(`${title} deleted`);
      fetchItems();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="text-slate-400">Loading...</div>;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <p className="text-slate-400 text-sm">{items.length} {title.toLowerCase()}</p>
        <button onClick={openAdd} className="btn-primary text-sm py-2.5"><FiPlus /> Add {title}</button>
      </div>

      {items.length === 0 ? (
        <div className="card p-12 text-center text-slate-500">
          <Icon className="mx-auto text-4xl mb-3 opacity-50" />
          <p>No {title.toLowerCase()} yet. Click "Add {title}" to get started.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div key={item.id} className="card-hover p-5 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white truncate">{summary ? summary(item) : (item.title || item.name || 'Item')}</h3>
                  {item.issuer && <p className="text-sm text-primary-400 truncate">{item.issuer}</p>}
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => openEdit(item)} className="p-2 text-slate-400 hover:text-primary-300"><FiEdit2 /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-400"><FiTrash2 /></button>
                </div>
              </div>
              {item.description && <p className="text-sm text-slate-400 line-clamp-2">{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? `Edit ${title}` : `Add ${title}`} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {columns.map((field) => {
              const Cmp = FIELD_COMPONENTS[field.type] || FIELD_COMPONENTS.text;
              return (
                <div key={field.key} className={field.full ? 'sm:col-span-2' : ''}>
                  {field.type !== 'check' && <label className="label-field">{field.label}</label>}
                  <Cmp field={field} value={form[field.key]} onChange={(v) => setForm({ ...form, [field.key]: v })} />
                </div>
              );
            })}
          </div>
          <button type="submit" disabled={saving} className="btn-primary w-full">{saving ? 'Saving...' : editing ? 'Update' : 'Add'} {title}</button>
        </form>
      </Modal>
    </div>
  );
}
