import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiTrash2, FiMail, FiCheck } from 'react-icons/fi';
import api from '../../../api/client';

export default function MessagesManager({ onUnreadChange }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/messages');
      setMessages(res.data);
      onUnreadChange(res.data.filter((m) => !m.is_read).length);
    } catch (err) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const markRead = async (id) => {
    try {
      await api.put(`/messages/${id}/read`);
      fetchMessages();
    } catch (err) {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await api.delete(`/messages/${id}`);
      toast.success('Message deleted');
      fetchMessages();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="text-ink-soft">Loading...</div>;

  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <p className="text-ink-soft text-sm">
          {messages.length} messages{unread > 0 && <span className="text-primary-600 ml-2">({unread} unread)</span>}
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="card p-10 text-center text-ink-faint">
          <FiMail className="mx-auto text-3xl mb-3" />
          <p>No messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`card p-5 ${!msg.is_read ? 'border-primary-500/50 bg-surface-900' : 'bg-surface-900/50'}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{msg.name}</h3>
                    {!msg.is_read && <span className="px-2 py-0.5 text-xs bg-primary-500/10 text-primary-600 rounded-full">New</span>}
                  </div>
                  <a href={`mailto:${msg.email}`} className="text-sm text-primary-600 hover:underline">{msg.email}</a>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-ink-faint">{new Date(msg.created_at).toLocaleString()}</p>
                  {!msg.is_read && (
                    <button onClick={() => markRead(msg.id)} className="p-2 text-ink-soft hover:text-primary-600" title="Mark as read"><FiCheck /></button>
                  )}
                  <button onClick={() => handleDelete(msg.id)} className="p-2 text-ink-soft hover:text-red-400" title="Delete"><FiTrash2 /></button>
                </div>
              </div>
              {msg.subject && <p className="text-sm font-medium text-ink-soft mb-1">Subject: {msg.subject}</p>}
              <p className="text-ink-soft text-sm">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
