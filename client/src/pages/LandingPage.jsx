import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  Scale,
  ShieldAlert,
  Flame,
  ArrowRight,
  Zap,
  Clock,
  HeartPulse,
  Brain,
  CheckCircle2,
  TrendingDown,
  ChevronRight,
  Gavel,
  Quote
} from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-primary-text selection:bg-accent-red selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          {/* Subtle background red glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-red/10 blur-[130px] -z-10 rounded-full pointer-events-none" />

          <div className="text-center space-y-6 max-w-4xl mx-auto">
            {/* Top Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-card-bg border border-accent-red/30 shadow-glow-red animate-pulse-subtle">
              <span className="w-2 h-2 rounded-full bg-accent-red"></span>
              <span className="text-xs font-mono font-medium text-accent-red tracking-wider">
                EVALUATION PROTOCOL v2.4 INITIALIZED
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              YOUR LIFE IS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-red via-red-500 to-accent-orange text-glow-red">
                UNDER REVIEW.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-secondary-text max-w-2xl mx-auto leading-relaxed">
              An AI judge that analyses your daily decisions, exposes your excuses and helps you become better.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/judge"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl font-semibold text-sm bg-accent-red text-white hover:bg-red-600 transition duration-200 shadow-glow-red group"
              >
                <span>Judge My Day</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl font-semibold text-sm bg-card-bg border border-border-subtle hover:border-border-highlight text-primary-text transition duration-200 hover:bg-card-hover"
              >
                <span>Explore Features</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="p-3.5 rounded-xl bg-card-bg border border-border-subtle">
                <p className="text-xl font-bold font-mono text-accent-red">0%</p>
                <p className="text-[11px] text-secondary-text">Sugar-Coating</p>
              </div>
              <div className="p-3.5 rounded-xl bg-card-bg border border-border-subtle">
                <p className="text-xl font-bold font-mono text-accent-orange">5</p>
                <p className="text-[11px] text-secondary-text">Pillars Evaluated</p>
              </div>
              <div className="p-3.5 rounded-xl bg-card-bg border border-border-subtle">
                <p className="text-xl font-bold font-mono text-accent-green">100%</p>
                <p className="text-[11px] text-secondary-text">Evidence-Based</p>
              </div>
              <div className="p-3.5 rounded-xl bg-card-bg border border-border-subtle">
                <p className="text-xl font-bold font-mono text-purple-400">4</p>
                <p className="text-[11px] text-secondary-text">Judicial Personas</p>
              </div>
            </div>
          </div>

          {/* SAMPLE INTERACTIVE CARD PREVIEW */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="relative rounded-2xl bg-[#121212] border border-accent-red/40 p-6 sm:p-8 shadow-glow-red">
              <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-accent-red/10 border border-accent-red/30 flex items-center justify-center">
                    <Gavel className="w-5 h-5 text-accent-red" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">SAMPLE OFFICIAL VERDICT</h3>
                    <p className="text-[10px] font-mono text-secondary-text">PRESIDING: SAVAGE BUT FAIR JUDGE</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-accent-red/20 text-accent-red border border-accent-red/40">
                  42 / 100 • NEEDS IMPROVEMENT
                </span>
              </div>

              <div className="py-5 space-y-4">
                <div className="p-4 rounded-xl bg-background border border-border-subtle italic text-gray-300 text-sm leading-relaxed border-l-4 border-l-accent-red">
                  "You spent 6 hours 'researching' tools for a task that requires 30 minutes of writing. You scrolled Reels until 2:00 AM, skipped the gym, and called it 'mental preparation.' Let's stop romanticizing procrastination."
                </div>

                {/* Micro Category Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                  <div className="p-2.5 rounded-lg bg-card-bg text-center border border-border-subtle">
                    <span className="text-[10px] text-secondary-text block">Productivity</span>
                    <span className="text-sm font-mono font-bold text-accent-red">25/100</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-card-bg text-center border border-border-subtle">
                    <span className="text-[10px] text-secondary-text block">Discipline</span>
                    <span className="text-sm font-mono font-bold text-accent-red">30/100</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-card-bg text-center border border-border-subtle">
                    <span className="text-[10px] text-secondary-text block">Health</span>
                    <span className="text-sm font-mono font-bold text-accent-green">75/100</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-card-bg text-center border border-border-subtle">
                    <span className="text-[10px] text-secondary-text block">Time Mgmt</span>
                    <span className="text-sm font-mono font-bold text-accent-red">20/100</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-card-bg text-center border border-border-subtle col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-secondary-text block">Consistency</span>
                    <span className="text-sm font-mono font-bold text-accent-orange">45/100</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-secondary-text">
                <span>Tomorrow's Mandate: Block phone in drawer from 9:00 to 11:30 AM.</span>
                <span className="text-accent-red font-mono font-semibold">VERDICT ENFORCED</span>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 bg-secondary-bg border-y border-border-subtle px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-mono font-bold tracking-widest text-accent-red uppercase">
                THE SYSTEM
              </span>
              <h2 className="text-3xl font-extrabold text-white">How The Court Operates</h2>
              <p className="text-sm text-secondary-text">
                Accountability requires data, truth and consequences. Three simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-card-bg border border-border-subtle relative space-y-4 hover:border-accent-red/30 transition-all">
                <span className="text-4xl font-extrabold font-mono text-accent-red/30">01</span>
                <h3 className="text-lg font-bold text-white">Log Your Daily Reality</h3>
                <p className="text-xs text-secondary-text leading-relaxed">
                  Enter focus hours, sleep, postponed tasks, genuine accomplishments, and honest distractions. No hiding.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card-bg border border-border-subtle relative space-y-4 hover:border-accent-red/30 transition-all">
                <span className="text-4xl font-extrabold font-mono text-accent-orange/30">02</span>
                <h3 className="text-lg font-bold text-white">Face The AI Cross-Examination</h3>
                <p className="text-xs text-secondary-text leading-relaxed">
                  Powered by Google Gemini with custom judicial system directives that expose cognitive leaks and evaluate 5 core life pillars.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card-bg border border-border-subtle relative space-y-4 hover:border-accent-red/30 transition-all">
                <span className="text-4xl font-extrabold font-mono text-accent-green/30">03</span>
                <h3 className="text-lg font-bold text-white">Execute Corrections</h3>
                <p className="text-xs text-secondary-text leading-relaxed">
                  Receive a numerical life score, the unvarnished verdict, a 3-point correction protocol, and tomorrow’s non-negotiable challenge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest text-accent-red uppercase">
              CAPABILITIES
            </span>
            <h2 className="text-3xl font-extrabold text-white">Engineered For Radical Honesty</h2>
            <p className="text-sm text-secondary-text">
              Most productivity apps coddle your excuses. LIFE JUDGE AI holds you to the standards you set for yourself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-card-bg border border-border-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">5-Pillar Scorecard</h3>
              <p className="text-xs text-secondary-text leading-relaxed">
                Evaluates Productivity, Discipline, Health, Time Management, and Consistency with objective mathematical weighting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card-bg border border-border-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center text-accent-orange">
                <Gavel className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">4 Distinct Judge Personas</h3>
              <p className="text-xs text-secondary-text leading-relaxed">
                Choose between Savage but Fair, Strict Professor, Supportive Mentor, or Sarcastic Comedian to calibrate the exact tone you need.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card-bg border border-border-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent-green/10 border border-accent-green/20 flex items-center justify-center text-accent-green">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Fairness & Health Guardrails</h3>
              <p className="text-xs text-secondary-text leading-relaxed">
                Never attacks personal worth or identity. Distinguishes necessary biological rest from lazy procrastination.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card-bg border border-border-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Comprehensive Weekly Audits</h3>
              <p className="text-xs text-secondary-text leading-relaxed">
                Aggregate 7-day performance, unmask your most recurrent distraction, and spotlight your best vs worst days.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card-bg border border-border-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Gemini Structured Reasoning</h3>
              <p className="text-xs text-secondary-text leading-relaxed">
                Strict server-side JSON schema validation guarantees consistent scores, rationales, and tomorrow’s actionable challenges.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card-bg border border-border-subtle space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Streak & Accountability Records</h3>
              <p className="text-xs text-secondary-text leading-relaxed">
                Track consecutive evaluated days, filter your archive by score range, and verify long-term trajectory.
              </p>
            </div>
          </div>
        </section>

        {/* WHY LIFE JUDGE */}
        <section className="py-20 bg-secondary-bg border-y border-border-subtle px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold text-white">Why Typical Habit Trackers Fail</h2>
              <p className="text-sm text-secondary-text max-w-xl mx-auto">
                Gentle reminders and empty badges do not stop you from doom-scrolling. Radical accountability does.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-card-bg border border-border-subtle space-y-4">
                <div className="flex items-center space-x-2 text-secondary-text">
                  <TrendingDown className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-semibold uppercase font-mono">Standard Habit Apps</span>
                </div>
                <ul className="space-y-2.5 text-xs text-secondary-text">
                  <li className="flex items-center space-x-2">
                    <span className="text-red-500">✕</span>
                    <span>Praises you for checking a single arbitrary box</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-red-500">✕</span>
                    <span>Ignores that you wasted 5 prime daylight hours</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-red-500">✕</span>
                    <span>No intelligent analysis of postponed priorities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-red-500">✕</span>
                    <span>Easy to fake and abandon when inconvenient</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#171111] border border-accent-red/40 space-y-4 shadow-card">
                <div className="flex items-center space-x-2 text-accent-red">
                  <Gavel className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase font-mono">LIFE JUDGE AI</span>
                </div>
                <ul className="space-y-2.5 text-xs text-primary-text">
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-green font-bold">✓</span>
                    <span>Cross-examines focus hours vs sleep vs distractions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-green font-bold">✓</span>
                    <span>Exposes procrastination patterns without attacking identity</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-green font-bold">✓</span>
                    <span>Delivers an unequivocal score from 0 to 100</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-accent-green font-bold">✓</span>
                    <span>Assigns an inescapable challenge for tomorrow</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 rounded-2xl bg-card-bg border border-accent-red/30 flex items-center justify-center mx-auto shadow-glow-red">
            <Scale className="w-8 h-8 text-accent-red" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Face Your Consequences?
            </h2>
            <p className="text-sm text-secondary-text">
              The Court is in session. Stop negotiating with your excuses and get your first daily verdict now.
            </p>
          </div>

          <div>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl font-semibold text-sm bg-accent-red text-white hover:bg-red-600 transition shadow-glow-red group"
            >
              <span>Create Account & Get Judged</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border-subtle bg-secondary-bg py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary-text">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-accent-red" />
            <span className="font-bold text-primary-text">LIFE JUDGE AI</span>
            <span>— Your Life. Your Decisions. Your Consequences.</span>
          </div>
          <div>
            <span>Fair accountability guaranteed. Decisions evaluated with Gemini AI.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

