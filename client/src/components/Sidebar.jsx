import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Gavel,
  History,
  CalendarCheck,
  LogOut,
  User,
  Menu,
  X,
  Scale,
  Sparkles
} from 'lucide-react';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Judge My Day', path: '/judge', icon: Gavel, highlight: true },
    { name: 'Judgement History', path: '/history', icon: History },
    { name: 'Weekly Review', path: '/weekly-review', icon: CalendarCheck }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between p-4 bg-secondary-bg">
      {/* Top Branding & Nav */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-card-bg border border-border-subtle flex items-center justify-center">
              <Scale className="w-4 h-4 text-accent-red" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-wider text-primary-text">
                LIFE JUDGE <span className="text-accent-red">AI</span>
              </span>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse"></span>
                <span className="text-[10px] text-secondary-text font-mono">COURT IN SESSION</span>
              </div>
            </div>
          </div>
          {mobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-secondary-text hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-accent-red/10 text-white border border-accent-red/30 shadow-glow-red'
                      : item.highlight
                      ? 'bg-card-bg text-primary-text border border-border-subtle hover:border-accent-red/40 hover:text-white'
                      : 'text-secondary-text hover:text-primary-text hover:bg-card-bg'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${item.highlight ? 'text-accent-red' : ''}`} />
                  <span>{item.name}</span>
                </div>
                {item.highlight && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-accent-red text-white uppercase tracking-wider font-semibold">
                    New
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User info & Logout */}
      <div className="pt-4 border-t border-border-subtle space-y-3">
        <div className="flex items-center space-x-3 px-2 py-1.5">
          <div className="w-8 h-8 rounded-full bg-card-bg border border-border-subtle flex items-center justify-center text-xs font-bold text-accent-red">
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-primary-text truncate">{user?.name || 'User'}</p>
            <p className="text-[10px] text-secondary-text truncate">{user?.email || ''}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs text-secondary-text hover:text-accent-red hover:bg-accent-red/5 border border-transparent hover:border-accent-red/20 transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Court</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-secondary-bg border-b border-border-subtle">
        <div className="flex items-center space-x-2">
          <Scale className="w-5 h-5 text-accent-red" />
          <span className="font-bold text-sm tracking-wide">LIFE JUDGE AI</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-1.5 rounded-lg bg-card-bg border border-border-subtle text-secondary-text hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10 border-r border-border-subtle">
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 border-r border-border-subtle">
        {navContent}
      </aside>
    </>
  );
};

export default Sidebar;

