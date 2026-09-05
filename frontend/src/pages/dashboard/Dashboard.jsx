import { useState, useEffect } from 'react';
import {
  FiLayout, FiUser, FiCode, FiFolder, FiBriefcase, FiBookOpen, FiMail,
  FiLogOut, FiMenu, FiX, FiEye, FiKey, FiAward, FiLayers, FiUsers,
  FiTrendingUp, FiTool, FiEdit3
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';
import ProfileManager from './components/ProfileManager';
import SkillsManager from './components/SkillsManager';
import ProjectsManager from './components/ProjectsManager';
import ExperienceManager from './components/ExperienceManager';
import EducationManager from './components/EducationManager';
import MessagesManager from './components/MessagesManager';
import SettingsManager from './components/SettingsManager';
import CertificationsManager from './components/CertificationsManager';
import ServicesManager from './components/ServicesManager';
import TestimonialsManager from './components/TestimonialsManager';
import StatsManager from './components/StatsManager';
import ToolsManager from './components/ToolsManager';
import AchievementsManager from './components/AchievementsManager';
import BlogManager from './components/BlogManager';

const tabs = [
  { id: 'profile', name: 'Profile', icon: FiUser },
  { id: 'sections', name: 'Sections & Settings', icon: FiLayout },
  { id: 'skills', name: 'Skills', icon: FiCode },
  { id: 'services', name: 'Services', icon: FiLayers },
  { id: 'projects', name: 'Projects', icon: FiFolder },
  { id: 'experience', name: 'Experience', icon: FiBriefcase },
  { id: 'education', name: 'Education', icon: FiBookOpen },
  { id: 'certifications', name: 'Certifications', icon: FiAward },
  { id: 'achievements', name: 'Achievements', icon: FiAward },
  { id: 'stats', name: 'Stats', icon: FiTrendingUp },
  { id: 'tools', name: 'Tools', icon: FiTool },
  { id: 'testimonials', name: 'Testimonials', icon: FiUsers },
  { id: 'blog', name: 'Blog', icon: FiEdit3 },
  { id: 'messages', name: 'Messages', icon: FiMail },
  { id: 'security', name: 'Security', icon: FiKey },
];

export default function Dashboard() {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (activeTab === 'messages') {
      api.get('/messages').then((res) => {
        setUnread(res.data.filter((m) => !m.is_read).length);
      }).catch(() => {});
    }
  }, [activeTab]);

  const renderTab = () => {
    switch (activeTab) {
      case 'profile': return <ProfileManager />;
      case 'sections': return <SettingsManager />;
      case 'skills': return <SkillsManager />;
      case 'services': return <ServicesManager />;
      case 'projects': return <ProjectsManager />;
      case 'experience': return <ExperienceManager />;
      case 'education': return <EducationManager />;
      case 'certifications': return <CertificationsManager />;
      case 'achievements': return <AchievementsManager />;
      case 'stats': return <StatsManager />;
      case 'tools': return <ToolsManager />;
      case 'testimonials': return <TestimonialsManager />;
      case 'blog': return <BlogManager />;
      case 'messages': return <MessagesManager onUnreadChange={setUnread} />;
      case 'security': return <SecurityManager />;
      default: return <ProfileManager />;
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-surface-700/60">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 bg-primary-500 border-2 border-ink flex items-center justify-center text-ink font-bold shadow-glow">
            {(user?.username || 'A')[0].toUpperCase()}
          </span>
          <div>
            <h2 className="font-display font-bold uppercase tracking-wider text-ink">Admin Panel</h2>
            <p className="text-xs text-ink-faint font-mono">@{user?.username || 'admin'}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 border text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-ink border-ink shadow-glow font-bold'
                  : 'text-ink-soft border-transparent hover:bg-surface-800 hover:text-ink hover:border-ink/20'
              }`}
            >
              <Icon size={16} />
              <span className="flex-1 text-left">{tab.name}</span>
              {tab.id === 'messages' && unread > 0 && (
                <span className={`px-2 py-0.5 text-xs ${activeTab === 'messages' ? 'bg-ink text-surface-950' : 'bg-primary-600 text-surface-950'}`}>{unread}</span>
              )}
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t border-surface-700/60 space-y-1">
        <a href="/" target="_blank" className="w-full flex items-center gap-3 px-4 py-2.5 border text-sm text-ink-soft hover:bg-surface-800 transition-colors">
          <FiEye /> View Site
        </a>
        <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 border text-sm text-primary-700 hover:bg-primary-500/10 transition-colors">
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-950 flex">
      <aside className="hidden md:block w-64 bg-surface-900 border-r-2 border-ink/70 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-surface-900 border-r-2 border-ink/70">
            <SidebarContent />
            <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-ink-faint hover:text-ink"><FiX /></button>
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-surface-900 border-b-2 border-ink/70 px-6 py-4 flex items-center gap-4 sticky top-0 z-40">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-ink-soft hover:text-ink"><FiMenu size={22} /></button>
          <div>
            <h1 className="font-display font-bold uppercase tracking-wider text-ink">{tabs.find((t) => t.id === activeTab)?.name || 'Dashboard'}</h1>
            <p className="text-xs text-ink-faint font-mono">CONSOLE — revise & ship</p>
          </div>
        </header>
        <main className="flex-1 p-6">{renderTab()}</main>
      </div>
    </div>
  );
}

function SecurityManager() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); setSuccess(false);
    if (newPassword !== confirmPassword) return setError('Passwords do not match');
    if (newPassword.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      await api.put('/auth/change-password', { currentPassword, newPassword });
      setSuccess(true);
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl animate-fade-in">
      <div className="card p-7 border-2 border-ink/70 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-9 h-9 bg-primary-500/10 border border-primary-600 text-primary-600 flex items-center justify-center"><FiKey /></span>
          <h2 className="font-display font-bold uppercase tracking-wider text-ink">Change Password</h2>
        </div>
        {error && <p className="text-sm text-primary-700 bg-primary-500/10 border border-primary-500/40 p-3 mb-4">{error}</p>}
        {success && <p className="text-sm text-primary-700 bg-primary-500/10 border border-primary-500/40 p-3 mb-4">Password changed successfully</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-field">Current Password</label>
            <input type="password" className="input-field" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>
          <div>
            <label className="label-field">New Password</label>
            <input type="password" className="input-field" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div>
            <label className="label-field">Confirm New Password</label>
            <input type="password" className="input-field" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            <FiKey /> {loading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
