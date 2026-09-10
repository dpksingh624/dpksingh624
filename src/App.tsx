import React, { useState, useEffect } from 'react';
import { GitHubUser, GitHubRepo, ReadmeConfig } from './types';
import { DEFAULT_USER, DEFAULT_REPOS, fetchGitHubUser, fetchGitHubRepos } from './utils/github';
import { Header } from './components/Header';
import { ProfileCard } from './components/ProfileCard';
import { ReadmeBuilder } from './components/ReadmeBuilder';
import { ReadmePreview } from './components/ReadmePreview';
import { RepoList } from './components/RepoList';
import { RefreshCw, Search, Sparkles } from 'lucide-react';

export function App() {
  const [user, setUser] = useState<GitHubUser>(DEFAULT_USER);
  const [repos, setRepos] = useState<GitHubRepo[]>(DEFAULT_REPOS);
  const [activeTab, setActiveTab] = useState<'profile' | 'builder' | 'repos'>('profile');
  const [loading, setLoading] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState<string>('dpksingh624');
  const [activeUsername, setActiveUsername] = useState<string>('dpksingh624');

  const [readmeConfig, setReadmeConfig] = useState<ReadmeConfig>({
    name: 'Deepak Singh',
    title: 'Full-Stack Developer & Open Source Enthusiast',
    currentRole: 'Full-Stack Engineer',
    aboutMe: 'Passionate developer dedicated to crafting modern, scalable applications and contributing to open-source software.',
    workingOn: 'Next-generation web applications and open-source tools',
    workingOnUrl: '',
    learning: 'Cloud Native Architectures, AI Agents & Web Systems',
    collaborateOn: 'Innovative Web Applications & Developer Tools',
    askMeAbout: 'React, TypeScript, Node.js, Web Architecture',
    funFact: 'Turning ideas into clean code with high precision!',
    email: 'dpksingh624@gmail.com',
    linkedin: '',
    twitter: '',
    portfolio: '',
    selectedSkills: [
      'react',
      'typescript',
      'javascript',
      'nodejs',
      'tailwindcss',
      'html5',
      'css3',
      'git',
      'github',
      'docker',
      'postgresql'
    ],
    showStatsCards: true,
    showStreakStats: true,
    showTopLangs: true,
    showActivityGraph: false,
    theme: 'radical',
    headerStyle: 'minimal'
  });

  const loadData = async (name: string) => {
    setLoading(true);
    try {
      const [userData, reposData] = await Promise.all([
        fetchGitHubUser(name),
        fetchGitHubRepos(name)
      ]);
      setUser(userData);
      setRepos(reposData);
      setActiveUsername(name);
      if (userData.name) {
        setReadmeConfig(prev => ({
          ...prev,
          name: userData.name || prev.name,
          email: userData.email || prev.email
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData('dpksingh624');
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim()) {
      loadData(usernameInput.trim());
    }
  };

  const handleResetToDpksingh = () => {
    setUsernameInput('dpksingh624');
    loadData('dpksingh624');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <Header
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Profile quick bar / search switch */}
      <div className="border-b border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-400">
            <span>Active Profile:</span>
            <span className="font-mono text-cyan-400 font-semibold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              @{activeUsername}
            </span>
            {activeUsername.toLowerCase() !== 'dpksingh624' && (
              <button
                type="button"
                onClick={handleResetToDpksingh}
                className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer ml-1"
              >
                Reset to dpksingh624
              </button>
            )}
          </div>

          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                placeholder="Lookup GitHub username..."
                className="w-44 sm:w-56 pl-7 pr-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2 top-2" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw className="w-3 h-3 animate-spin text-cyan-400" />
              ) : (
                <span>Load</span>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'profile' && (
          <div className="space-y-8">
            <ProfileCard
              user={user}
              onOpenBuilder={() => setActiveTab('builder')}
            />

            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Featured Repository: Special Profile Repo
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveTab('builder')}
                  className="flex items-center space-x-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Open README Builder</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/30 border border-cyan-500/30 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-cyan-300 font-bold text-base">
                      {user.login}/{user.login}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                      Public
                    </span>
                  </div>
                  <a
                    href={`https://github.com/${user.login}/${user.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    View on GitHub →
                  </a>
                </div>
                <p className="text-sm text-slate-300">
                  This is the special GitHub repository for @{user.login}. Its README.md will appear on your GitHub profile page! Use the README Builder tab to design and copy your personalized Markdown profile.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'builder' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6">
              <ReadmeBuilder
                config={readmeConfig}
                onChange={setReadmeConfig}
                user={user}
              />
            </div>
            <div className="lg:col-span-6 lg:sticky lg:top-24">
              <ReadmePreview
                config={readmeConfig}
                user={user}
              />
            </div>
          </div>
        )}

        {activeTab === 'repos' && (
          <RepoList
            repos={repos}
            username={user.login}
          />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p>
            GitHub Profile & README Studio for{' '}
            <strong className="text-slate-400 font-mono">@{user.login}</strong>
          </p>
          <p className="text-slate-600">
            Designed for GitHub Repository{' '}
            <a
              href={`https://github.com/${user.login}/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 underline"
            >
              {user.login}/{user.login}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
