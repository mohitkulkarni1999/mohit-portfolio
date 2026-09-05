import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';
import api from '../../../api/client';
import Modal from '../../../components/Modal';

const emptyForm = { title: '', slug: '', excerpt: '', content: '', cover_image: '', tags: '', published: true, read_minutes: 5 };

export default function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/blog');
      setPosts(res.data);
    } catch (err) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const openAdd = () => { setEditing(null); setForm(emptyForm); setOpen(true); };
  const openEdit = (p) => {
    setEditing(p);
    setForm({ ...p, tags: Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || '') });
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return toast.error('Title is required');
    const slug = form.slug || slugify(form.title);
    const payload = { ...form, slug: slugify(slug), tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) };
    setEditing(null);
    try {
      if (editing) {
        await api.put(`/blog/${editing.id}`, payload);
        toast.success('Post updated');
      } else {
        await api.post('/blog', payload);
        toast.success('Post created');
      }
      setOpen(false);
      fetchPosts();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save post');
    } finally {
      setEditing(editing);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    try {
      await api.delete(`/blog/${id}`);
      toast.success('Post deleted');
      fetchPosts();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const togglePublished = async (p) => {
    try {
      const payload = { ...p, tags: Array.isArray(p.tags) ? p.tags : (p.tags || []), published: !p.published };
      await api.put(`/blog/${p.id}`, payload);
      fetchPosts();
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  if (loading) return <div className="text-slate-400">Loading...</div>;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <p className="text-slate-400 text-sm">{posts.length} posts</p>
        <button onClick={openAdd} className="btn-primary text-sm py-2.5"><FiPlus /> New Post</button>
      </div>

      <div className="space-y-4">
        {posts.map((p) => (
          <div key={p.id} className="card-hover p-5 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-white truncate">{p.title}</h3>
                {!p.published && <span className="chip !bg-amber-500/10 !text-amber-300 !border-amber-500/30">Draft</span>}
              </div>
              <p className="text-sm text-slate-500 mb-1">/{p.slug} · {p.read_minutes} min read · {new Date(p.created_at).toLocaleDateString()}</p>
              <p className="text-sm text-slate-400 line-clamp-1">{p.excerpt}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => togglePublished(p)} className="p-2 text-slate-400 hover:text-yellow-300" title={p.published ? 'Unpublish' : 'Publish'}>
                {p.published ? <FiEye /> : <FiEyeOff />}
              </button>
              <button onClick={() => openEdit(p)} className="p-2 text-slate-400 hover:text-primary-300"><FiEdit2 /></button>
              <button onClick={() => handleDelete(p.id)} className="p-2 text-slate-400 hover:text-red-400"><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Edit Post' : 'New Post'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-field">Title</label>
            <input className="input-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <label className="label-field">Slug (optional)</label>
            <input className="input-field" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated from title" />
          </div>
          <div>
            <label className="label-field">Excerpt</label>
            <textarea className="input-field" rows="2" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}></textarea>
          </div>
          <div>
            <label className="label-field">Content</label>
            <textarea className="input-field font-mono" rows="8" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Write your post content here..."></textarea>
          </div>
          <div>
            <label className="label-field">Cover Image URL</label>
            <input className="input-field" value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} placeholder="https://" />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="label-field">Tags (comma separated)</label>
              <input className="input-field" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            </div>
            <div>
              <label className="label-field">Read Time (min)</label>
              <input type="number" className="input-field" value={form.read_minutes} onChange={(e) => setForm({ ...form, read_minutes: +e.target.value })} />
            </div>
            <div className="flex items-end pb-1">
              <button
                type="button"
                onClick={() => setForm({ ...form, published: !form.published })}
                className={`w-full py-3 rounded-xl text-sm font-medium transition-colors ${form.published ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'}`}
              >
                {form.published ? 'Published' : 'Draft'}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-primary w-full">{editing ? 'Update' : 'Create'} Post</button>
        </form>
      </Modal>
    </div>
  );
}
