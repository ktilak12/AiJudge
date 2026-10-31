import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Scale, ShieldAlert, User, LogOut, LayoutDashboard, PlusCircle } from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-card-bg border border-border-subtle flex items-center justify-center group-hover:border-accent-red transition-all duration-300 shadow-card">
            <Scale className="w-5 h-5 text-accent-red group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-wider text-primary-text group-hover:text-white transition-colors">
                LIFE JUDGE <span className="text-accent-red">AI</span>
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-accent-red/10 text-accent-red border border-accent-red/20">
                v2.4
              </span>
            </div>
            <p className="text-[10px] text-secondary-text hidden sm:block tracking-wide">
              YOUR LIFE. YOUR DECISIONS. YOUR CONSEQUENCES.
            </p>
          </div>
        </Link>

        {/* Navigation / Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/judge"
                className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-accent-red text-white hover:bg-red-600 transition shadow-glow-red"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Judge My Day</span>
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary-text bg-card-bg border border-border-subtle hover:border-border-highlight transition"
              >
                <LayoutDashboard className="w-4 h-4 text-accent-red" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                title="Logout"
                className="p-2 rounded-lg text-secondary-text hover:text-white hover:bg-card-bg border border-transparent hover:border-border-subtle transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-xs font-medium text-secondary-text hover:text-white transition"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-accent-red text-white hover:bg-red-600 transition shadow-glow-red"
              >
                <span>Get Judged</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

