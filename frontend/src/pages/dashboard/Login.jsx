import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiLock, FiUser, FiLogIn, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return toast.error('Please enter all fields');
    setLoading(true);
    try {
      await login(username, password);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-grad" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -top-40 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 left-0 w-96 h-96 bg-primary-700/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative animate-slide-up">
        <div className="card overflow-hidden p-0 shadow-glow">
          <div className="flex items-center gap-2 px-4 py-3 bg-surface-900/90 border-b border-surface-700/60">
            <span className="terminal-dots">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </span>
            <span className="ml-3 text-xs text-slate-500 font-mono">mohit@portfolio: ~/admin</span>
            <span className="ml-auto text-primary-400 font-mono text-xs">&gt;_</span>
          </div>

          <div className="p-7 sm:p-8 font-mono">
            <p className="text-xs text-slate-600 mb-6">
              <span className="text-primary-400">$</span> ssh admin@mohit.dev
            </p>

            <div className="text-center mb-8">
              <div className="w-14 h-14 mx-auto bg-surface-900 border border-primary-500/30 rounded-lg flex items-center justify-center mb-4">
                <FiLock className="text-primary-400 text-xl" />
              </div>
              <h1 className="text-xl font-bold text-white">ADMIN_ACCESS</h1>
              <p className="text-slate-500 text-xs mt-1">authentication required — verify identity</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label-field"><span className="text-primary-400">$</span> username:</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    className="input-field pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                  />
                </div>
              </div>
              <div>
                <label className="label-field"><span className="text-primary-400">$</span> password:</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="password"
                    className="input-field pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center font-mono disabled:opacity-50">
                <FiLogIn className="text-surface-950" /> {loading ? 'authenticating...' : 'grunt --login'}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-surface-700/50 text-xs text-slate-500 flex items-center justify-between">
              <span>default: admin / admin123</span>
              <a href="/" className="flex items-center gap-1.5 text-slate-500 hover:text-primary-300 transition-colors">
                <FiArrowLeft size={12} /> back_to_site
              </a>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-slate-600 mt-4 font-mono">
          <span className="text-primary-400">$</span> status: <span className="text-emerald-400">secure_connection_established</span>
        </p>
      </div>
    </div>
  );
}