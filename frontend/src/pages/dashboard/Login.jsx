import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiLock, FiUser, FiLogIn, FiArrowLeft, FiKey, FiPlus } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import BlueprintBackground from '../../components/BlueprintBackground';

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
      toast.success('Access granted');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Access denied');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
      <BlueprintBackground variant="quiet" />
      <div className="absolute inset-0 bg-hero-grad" />
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-ink-faint rotate-90 lg:rotate-0">restricted area — authorized personnel only</span>
      </div>

      <div className="w-full max-w-md relative">
        <div className="card relative p-0 border-2 border-ink/70 shadow-card">
          <span className="absolute -top-2 -left-2 text-primary-500" aria-hidden><FiPlus size={14} /></span>
          <span className="absolute -top-2 -right-2 text-primary-500" aria-hidden><FiPlus size={14} /></span>
          <span className="absolute -bottom-2 -left-2 text-primary-500" aria-hidden><FiPlus size={14} /></span>
          <span className="absolute -bottom-2 -right-2 text-primary-500" aria-hidden><FiPlus size={14} /></span>

          <div className="flex items-center justify-between px-5 py-3 bg-surface-900 border-b-2 border-ink/70 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
            <span>Access Gate — AG-01</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-primary-500 rotate-45" /> restricted</span>
          </div>

          <div className="p-7 sm:p-8">
            <div className="text-center mb-8">
              <div className="w-14 h-14 mx-auto bg-primary-500 border-2 border-ink flex items-center justify-center text-ink shadow-glow mb-4 relative">
                <FiKey className="text-xl" />
              </div>
              <h1 className="font-display text-2xl font-extrabold uppercase text-ink">Admin Access</h1>
              <p className="text-ink-faint text-xs font-mono mt-1 uppercase tracking-widest">identity verification required</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label-field"><span className="text-primary-600">□</span> username <span className="text-primary-600">*</span>:</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
                  <input
                    className="input-field pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                  />
                </div>
              </div>
              <div>
                <label className="label-field"><span className="text-primary-600">□</span> password <span className="text-primary-600">*</span>:</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
                  <input
                    type="password"
                    className="input-field pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                <FiLogIn className="text-primary-700" /> {loading ? 'verifying...' : 'verify & unlock →'}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-ink/15 text-xs text-ink-faint flex items-center justify-between font-mono">
              <span>default: admin / admin123</span>
              <a href="/" className="flex items-center gap-1.5 text-ink-faint hover:text-primary-600 transition-colors">
                <FiArrowLeft size={12} /> back to site
              </a>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-ink-faint mt-4 font-mono">
          <span className="text-primary-600">[$]</span> access denied until valid credentials supplied
        </p>
      </div>
    </div>
  );
}