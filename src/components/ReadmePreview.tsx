import React, { useState } from 'react';
import { ReadmeConfig, GitHubUser } from '../types';
import { generateReadmeMarkdown } from '../utils/markdownGenerator';
import { POPULAR_SKILLS } from '../data/skills';
import {
  Copy,
  Check,
  Download,
  Code,
  Eye,
  GitBranch,
  HelpCircle,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

interface ReadmePreviewProps {
  config: ReadmeConfig;
  user: GitHubUser;
}

export const ReadmePreview: React.FC<ReadmePreviewProps> = ({ config, user }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'visual' | 'raw'>('visual');
  const markdown = generateReadmeMarkdown(config, user);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'README.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const selectedSkillsList = POPULAR_SKILLS.filter(s =>
    config.selectedSkills.includes(s.id)
  );

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
        <div className="flex items-center space-x-2">
          <div className="bg-slate-900 p-1 rounded-xl border border-slate-700/80 flex">
            <button
              id="btn-view-visual"
              type="button"
              onClick={() => setViewMode('visual')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'visual'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
            <button
              id="btn-view-raw"
              type="button"
              onClick={() => setViewMode('raw')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'raw'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Raw Markdown</span>
            </button>
          </div>
          <span className="text-xs text-slate-400 font-mono hidden md:inline">
            README.md ({markdown.split('\n').length} lines)
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            id="btn-copy-markdown"
            type="button"
            onClick={handleCopy}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm ${
              copied
                ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-400/50'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
            }`}
          >
            {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy README.md'}</span>
          </button>

          <button
            id="btn-download-readme"
            type="button"
            onClick={handleDownload}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      {/* Main Content Pane */}
      {viewMode === 'raw' ? (
        <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[600px] shadow-inner">
          <pre className="whitespace-pre-wrap">{markdown}</pre>
        </div>
      ) : (
        /* Visual GitHub Simulation Preview */
        <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Simulated GitHub README frame */}
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 pb-4 border-b border-slate-800">
            <GitBranch className="w-4 h-4 text-slate-400" />
            <span className="text-slate-300 font-semibold">{user.login}</span>
            <span>/</span>
            <span className="text-slate-200">README.md</span>
          </div>

          {/* Rendered Header */}
          <div className="space-y-4">
            {config.headerStyle === 'wave' ? (
              <div className="text-center py-2">
                <h1 className="text-2xl font-bold text-white">
                  👋 Hi there, I'm <span className="text-cyan-400">{config.name || user.name || 'Deepak Singh'}</span>
                </h1>
              </div>
            ) : config.headerStyle === 'typing' ? (
              <div className="text-center py-2 space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  🚀 {config.name || user.name || 'Deepak Singh'}
                </h1>
                <div className="inline-block px-3 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-cyan-400 text-sm">
                  {config.title || 'Full-Stack Developer & Open Source Enthusiast'}
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Hello World, I'm {config.name || user.name || 'Deepak Singh'} 👋
                </h1>
                {config.title && (
                  <p className="text-slate-400 font-medium">{config.title}</p>
                )}
              </div>
            )}

            {config.aboutMe && (
              <blockquote className="border-l-4 border-cyan-500 pl-4 py-1 text-slate-300 italic text-sm">
                {config.aboutMe}
              </blockquote>
            )}
          </div>

          {/* Rendered About me details */}
          <div className="space-y-3 text-sm text-slate-300">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
              👨‍💻 About Me
            </h2>
            <ul className="space-y-2 pl-4 list-disc marker:text-cyan-400">
              {config.workingOn && (
                <li>
                  🔭 I'm currently working on <strong>{config.workingOn}</strong>
                </li>
              )}
              {config.learning && (
                <li>
                  🌱 I'm currently learning <strong>{config.learning}</strong>
                </li>
              )}
              {config.askMeAbout && (
                <li>
                  💬 Ask me about <strong>{config.askMeAbout}</strong>
                </li>
              )}
              {config.email && (
                <li>
                  📫 How to reach me:{' '}
                  <a href={`mailto:${config.email}`} className="text-cyan-400 underline">
                    {config.email}
                  </a>
                </li>
              )}
              {config.funFact && (
                <li>
                  ⚡ Fun fact: <strong>{config.funFact}</strong>
                </li>
              )}
            </ul>
          </div>

          {/* Rendered Skills Badges */}
          {selectedSkillsList.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
                🛠️ Languages & Tools
              </h2>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedSkillsList.map(s => (
                  <img
                    key={s.id}
                    src={s.badgeUrl}
                    alt={s.name}
                    className="h-7 rounded object-contain"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Rendered GitHub Stats */}
          {(config.showStatsCards || config.showStreakStats || config.showTopLangs) && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
                📊 GitHub Statistics
              </h2>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                {config.showStatsCards && (
                  <img
                    src={`https://github-readme-stats.vercel.app/api?username=${user.login}&show_icons=true&theme=${config.theme}&hide_border=false`}
                    alt="Stats"
                    className="max-w-full h-auto rounded"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                )}
                {config.showTopLangs && (
                  <img
                    src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${user.login}&layout=compact&theme=${config.theme}&hide_border=false`}
                    alt="Top Languages"
                    className="max-w-full h-auto rounded"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                )}
                {config.showStreakStats && (
                  <img
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${user.login}&theme=${config.theme}&hide_border=false`}
                    alt="Streak"
                    className="max-w-full h-auto rounded"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Guide Box for Publishing to GitHub */}
      <div className="rounded-2xl bg-cyan-950/20 border border-cyan-500/30 p-5 space-y-3">
        <div className="flex items-center space-x-2 text-cyan-400">
          <HelpCircle className="w-5 h-5" />
          <h3 className="font-semibold text-sm text-cyan-200">
            How to publish this to your GitHub Profile ({user.login}/{user.login})
          </h3>
        </div>

        <ol className="space-y-2 text-xs sm:text-sm text-slate-300 list-decimal pl-5">
          <li>
            Click <strong className="text-white">"Copy README.md"</strong> above or download the file.
          </li>
          <li>
            Open your GitHub repository:{' '}
            <a
              href={`https://github.com/${user.login}/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline font-mono inline-flex items-center gap-1"
            >
              github.com/{user.login}/{user.login}
              <ExternalLink className="w-3 h-3" />
            </a>
          </li>
          <li>
            Create or edit <code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-300 font-mono">README.md</code>, paste the content, and commit changes!
          </li>
          <li>
            Navigate to your GitHub profile at <code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-300 font-mono">github.com/{user.login}</code> to see your new profile showcase live!
          </li>
        </ol>
      </div>
    </div>
  );
};
