import React from 'react';
import { GitBranch, BookOpen, Sparkles, FolderGit2, ExternalLink } from 'lucide-react';
import { GitHubUser } from '../types';

interface HeaderProps {
  user: GitHubUser;
  activeTab: 'profile' | 'builder' | 'repos';
  setActiveTab: (tab: 'profile' | 'builder' | 'repos') => void;
}

export const Header: React.FC<HeaderProps> = ({ user, activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-100 text-lg tracking-tight">
                  {user.login}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
                  Special Profile Repo
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Config files for GitHub profile
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <nav className="flex space-x-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
              <button
                id="tab-profile"
                onClick={() => setActiveTab('profile')}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'profile'
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Profile & Stats</span>
              </button>

              <button
                id="tab-builder"
                onClick={() => setActiveTab('builder')}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'builder'
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>README Builder</span>
              </button>

              <button
                id="tab-repos"
                onClick={() => setActiveTab('repos')}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'repos'
                    ? 'bg-cyan-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Repositories</span>
              </button>
            </nav>

            <a
              id="github-profile-link"
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700/80 text-xs font-medium transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
