import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { token, loading } = useAuth();
  if (loading) return <div className="flex h-screen items-center justify-center text-ink-soft">Loading...</div>;
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
