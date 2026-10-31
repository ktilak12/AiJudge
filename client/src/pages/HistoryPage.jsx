import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import EmptyState from '../components/EmptyState';
import ConfirmationModal from '../components/ConfirmationModal';
import { judgeAPI } from '../services/api';
import {
  History,
  Filter,
  Trash2,
  ExternalLink,
  Calendar,
  Search,
  ShieldAlert,
  ArrowUpDown,
  PlusCircle,
  AlertCircle
} from 'lucide-react';

export const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [categoryFilter, setCategoryFilter] = useState('');
  const [scoreFilter, setScoreFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');

  // Delete modal state
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await judgeAPI.getHistory();
      setHistory(res.data.data);
      setFiltered(res.data.data);
    } catch (err) {
      console.error('Error fetching history:', err);
      setError('Unable to retrieve judicial records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Filter application
  useEffect(() => {
    let result = [...history];

    if (categoryFilter) {
      result = result.filter((item) => item.performanceLabel === categoryFilter);
    }

    if (scoreFilter === 'high') {
      result = result.filter((item) => item.overallScore >= 75);
    } else if (scoreFilter === 'mid') {
      result = result.filter((item) => item.overallScore >= 50 && item.overallScore < 75);
    } else if (scoreFilter === 'low') {
      result = result.filter((item) => item.overallScore < 50);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.verdict?.toLowerCase().includes(q) ||
          item.summary?.toLowerCase().includes(q) ||
          item.biggestMistake?.toLowerCase().includes(q)
      );
    }

    // Sort Order
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setFiltered(result);
  }, [categoryFilter, scoreFilter, sortOrder, searchQuery, history]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await judgeAPI.delete(deleteId);
      setHistory((prev) => prev.filter((item) => item._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete the case record.');
    } finally {
      setIsDeleting(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-accent-green bg-accent-green/10 border-accent-green/30';
    if (score >= 50) return 'text-accent-orange bg-accent-orange/10 border-accent-orange/30';
    return 'text-accent-red bg-accent-red/10 border-accent-red/30';
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-primary-text selection:bg-accent-red selection:text-white">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-secondary-text mb-1">
              <History className="w-3.5 h-3.5 text-accent-red" />
              <span>CASE ARCHIVE & JUDICIAL DOCKET</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Judgement History
            </h1>
            <p className="text-xs text-secondary-text mt-1">
              Review every historical trial, analyze your accountability trajectory, or expunge records.
            </p>
          </div>

          <Link
            to="/judge"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-accent-red text-white hover:bg-red-600 transition shadow-glow-red w-fit"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Judge Today</span>
          </Link>
        </div>

        {error && (
          <div className="flex items-center space-x-2.5 p-3.5 rounded-xl bg-accent-red/10 border border-accent-red/30 text-accent-red text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-card-bg border border-border-subtle grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-secondary-text absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search verdicts or mistakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-secondary-bg border border-border-subtle focus:border-accent-red text-white placeholder-secondary-text/50 outline-none"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-secondary-bg border border-border-subtle focus:border-accent-red text-white outline-none cursor-pointer"
            >
              <option value="">All Performance Categories</option>
              <option value="Exceptional Day">Exceptional Day (90-100)</option>
              <option value="Strong Performance">Strong Performance (75-89)</option>
              <option value="Decent Progress">Decent Progress (60-74)</option>
              <option value="Needs Improvement">Needs Improvement (40-59)</option>
              <option value="Serious Reflection Needed">Serious Reflection Needed (0-39)</option>
            </select>
          </div>

          {/* Score Range Filter */}
          <div>
            <select
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-secondary-bg border border-border-subtle focus:border-accent-red text-white outline-none cursor-pointer"
            >
              <option value="">All Scores</option>
              <option value="high">High Performance (≥ 75)</option>
              <option value="mid">Moderate Performance (50–74)</option>
              <option value="low">Critical Alerts (&lt; 50)</option>
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="w-full py-2 px-3 rounded-xl bg-secondary-bg border border-border-subtle hover:border-border-highlight text-secondary-text hover:text-white flex items-center justify-between transition"
            >
              <span>Chronological: {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Records Listing */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-accent-red border-t-transparent animate-spin mx-auto"></div>
            <p className="text-xs font-mono text-secondary-text">Retrieving Archived Records...</p>
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No Matching Records"
            description={
              history.length === 0
                ? "You haven't submitted any days to the Court yet. Begin your record now."
                : 'No trials matched your active search and filter criteria.'
            }
            actionText="Judge My Day"
            actionLink="/judge"
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => {
              const dateObj = new Date(item.createdAt);
              const formattedDate = dateObj.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <div
                  key={item._id}
                  className="rounded-2xl bg-card-bg border border-border-subtle hover:border-border-highlight p-5 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-mono font-bold border ${getScoreColor(
                          item.overallScore
                        )}`}
                      >
                        <span className="text-base leading-none">{item.overallScore}</span>
                        <span className="text-[9px] opacity-70">/100</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-white font-mono">
                            {formattedDate}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-bg border border-border-subtle text-secondary-text">
                            {item.performanceLabel}
                          </span>
                        </div>
                        <p className="text-[11px] text-secondary-text mt-0.5">
                          Pillars: Prod {item.categoryScores?.productivity?.score} • Disc {item.categoryScores?.discipline?.score} • Health {item.categoryScores?.health?.score}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-center">
                      <Link
                        to={`/judge/result/${item._id}`}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary-bg hover:bg-card-hover border border-border-subtle text-primary-text transition"
                      >
                        <span>View Details</span>
                        <ExternalLink className="w-3.5 h-3.5 text-accent-red" />
                      </Link>
                      <button
                        onClick={() => setDeleteId(item._id)}
                        title="Delete Record"
                        className="p-1.5 rounded-lg text-secondary-text hover:text-accent-red hover:bg-accent-red/10 border border-transparent hover:border-accent-red/20 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Verdict snippet */}
                  <div className="p-3 rounded-xl bg-secondary-bg/80 border border-border-subtle text-xs text-gray-300 italic border-l-2 border-l-accent-red/60 line-clamp-2">
                    "{item.verdict}"
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Expunge Court Record"
        message="This action will permanently delete this daily judgement and activity log from the database. This cannot be undone."
        confirmText={isDeleting ? 'Expunging...' : 'Delete Record'}
        isDanger={true}
      />
    </div>
  );
};

export default HistoryPage;

