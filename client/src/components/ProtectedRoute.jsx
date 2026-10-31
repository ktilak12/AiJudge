import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Scale } from 'lucide-react';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-primary-text space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-card-bg border border-accent-red/40 flex items-center justify-center animate-pulse shadow-glow-red">
            <Scale className="w-8 h-8 text-accent-red" />
          </div>
          <div className="absolute -inset-1 rounded-2xl bg-accent-red/20 blur-md -z-10 animate-ping"></div>
        </div>
        <p className="text-xs font-mono uppercase tracking-widest text-secondary-text">
          Authenticating with Supreme Court...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

