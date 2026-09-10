import React from 'react';
import { GitHubUser } from '../types';
import {
  MapPin,
  Mail,
  Calendar,
  BookMarked,
  Users,
  Code2,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface ProfileCardProps {
  user: GitHubUser;
  onOpenBuilder: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, onOpenBuilder }) => {
  const memberDate = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="space-y-6">
      {/* Banner & User Hero */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-800 via-slate-800/90 to-slate-900 border border-slate-700/80 p-6 sm:p-8 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative group">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl ring-4 ring-cyan-500/30 object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-cyan-500 text-slate-900 shadow-md">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {user.name || user.login}
              </h1>
              <span className="text-sm font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-800/60">
                @{user.login}
              </span>
            </div>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              {user.bio || 'Developer building open-source tools and web applications.'}
            </p>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-400 pt-1">
              {user.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  {user.location}
                </span>
              )}
              {user.email && (
                <a
                  href={`mailto:${user.email}`}
                  className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-slate-500" />
                  {user.email}
                </a>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-slate-500" />
                Joined {memberDate}
              </span>
            </div>
          </div>

          <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
            <button
              id="btn-edit-readme-hero"
              onClick={onOpenBuilder}
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Customize Profile</span>
            </button>
            <a
              id="btn-view-github-repo"
              href={`https://github.com/${user.login}/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-medium transition-colors"
            >
              <span>GitHub Repo</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Stats Counter Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Public Repos</span>
            <BookMarked className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white">{user.public_repos}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Followers</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{user.followers}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Following</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{user.following}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Profile Status</span>
            <Code2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-sm font-semibold text-emerald-400">Ready for README</div>
        </div>
      </div>

      {/* GitHub Real-Time Cards Preview */}
      <div className="rounded-2xl bg-slate-800/40 border border-slate-700/60 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Live GitHub Badges & Cards</h2>
            <p className="text-xs text-slate-400">Real-time statistics fetched from GitHub API services</p>
          </div>
          <span className="text-xs font-mono text-cyan-400 px-2 py-1 rounded bg-cyan-950/60 border border-cyan-800/40">
            {user.login}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 flex items-center justify-center min-h-[160px]">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${user.login}&show_icons=true&theme=radical&hide_border=true`}
              alt="GitHub Stats"
              className="max-w-full h-auto"
              loading="lazy"
              onError={(e) => {
                // Fallback display if GitHub Readme Stats service is busy
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.parentElement) {
                  const fallbackDiv = document.createElement('div');
                  fallbackDiv.className = 'text-center p-4 text-slate-400 text-xs';
                  fallbackDiv.innerText = `GitHub Stats for @${user.login} (${user.public_repos} Repositories)`;
                  target.parentElement.appendChild(fallbackDiv);
                }
              }}
            />
          </div>

          <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 flex items-center justify-center min-h-[160px]">
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${user.login}&theme=radical&hide_border=true`}
              alt="GitHub Streak"
              className="max-w-full h-auto"
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.parentElement) {
                  const fallbackDiv = document.createElement('div');
                  fallbackDiv.className = 'text-center p-4 text-slate-400 text-xs';
                  fallbackDiv.innerText = `GitHub Streak Stats for @${user.login}`;
                  target.parentElement.appendChild(fallbackDiv);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
