import React from 'react';
import { GitHubRepo } from '../types';
import { GitFork, Star, ExternalLink, Code2, Calendar } from 'lucide-react';

interface RepoListProps {
  repos: GitHubRepo[];
  username: string;
}

export const RepoList: React.FC<RepoListProps> = ({ repos, username }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Repositories ({repos.length})
          </h2>
          <p className="text-xs text-slate-400">
            Public repositories belonging to @{username}
          </p>
        </div>
        <a
          href={`https://github.com/${username}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
        >
          <span>View on GitHub</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map(repo => {
          const isProfileRepo = repo.name.toLowerCase() === username.toLowerCase();
          const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });

          return (
            <div
              key={repo.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isProfileRepo
                  ? 'bg-gradient-to-br from-slate-800/90 to-cyan-950/20 border-cyan-500/40 ring-1 ring-cyan-500/20'
                  : 'bg-slate-800/50 border-slate-700/60 hover:border-slate-600'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-base text-white hover:text-cyan-400 transition-colors">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        {repo.name}
                      </a>
                    </h3>
                    {isProfileRepo && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                        Profile README
                      </span>
                    )}
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-slate-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                  {repo.description || 'No description provided.'}
                </p>

                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {repo.topics.map(topic => (
                      <span
                        key={topic}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900/80 text-cyan-400 border border-slate-700/60"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-700/40 text-xs text-slate-400">
                <div className="flex items-center space-x-3">
                  {repo.language && (
                    <span className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                      <span>{repo.language}</span>
                    </span>
                  )}
                  <span className="flex items-center space-x-1">
                    <Star className="w-3.5 h-3.5 text-slate-500" />
                    <span>{repo.stargazers_count}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <GitFork className="w-3.5 h-3.5 text-slate-500" />
                    <span>{repo.forks_count}</span>
                  </span>
                </div>

                <div className="flex items-center space-x-1 text-[11px] text-slate-500">
                  <Calendar className="w-3 h-3" />
                  <span>Updated {updatedDate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
