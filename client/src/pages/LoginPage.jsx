import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Scale, Lock, Mail, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || 'Authentication failed. Please verify your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    setEmail('judge.demo@lifejudge.ai');
    setPassword('demopass123');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-background selection:bg-accent-red selection:text-white relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-red/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-card-bg border border-accent-red/30 flex items-center justify-center shadow-card">
              <Scale className="w-5 h-5 text-accent-red" />
            </div>
            <span className="font-extrabold text-xl tracking-wider text-white">
              LIFE JUDGE <span className="text-accent-red">AI</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white pt-2">Step Forward to the Bench</h2>
          <p className="text-xs text-secondary-text">Sign in to review your ongoing daily trial</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-card-bg border border-border-subtle p-6 sm:p-8 shadow-2xl space-y-5">
          {error && (
            <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-accent-red/10 border border-accent-red/30 text-accent-red text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-secondary-text mb-1.5 font-mono">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-secondary-text absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary-bg border border-border-subtle focus:border-accent-red focus:ring-1 focus:ring-accent-red text-xs text-white placeholder-secondary-text/50 outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-secondary-text mb-1.5 font-mono">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-secondary-text absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary-bg border border-border-subtle focus:border-accent-red focus:ring-1 focus:ring-accent-red text-xs text-white placeholder-secondary-text/50 outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold text-xs bg-accent-red text-white hover:bg-red-600 transition shadow-glow-red disabled:opacity-50"
            >
              <span>{loading ? 'Consulting The Docket...' : 'Enter The Courtroom'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Test Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-2 px-3 rounded-lg bg-secondary-bg border border-border-subtle hover:border-accent-orange/40 text-[11px] text-secondary-text hover:text-white flex items-center justify-center space-x-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent-orange" />
              <span>Prefill Demo Account Credentials</span>
            </button>
          </div>

          <div className="text-center pt-2 border-t border-border-subtle text-xs text-secondary-text">
            <span>New defendant? </span>
            <Link to="/register" className="text-accent-red hover:underline font-semibold">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

