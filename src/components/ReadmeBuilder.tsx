import React, { useState } from 'react';
import { ReadmeConfig, GitHubUser } from '../types';
import { POPULAR_SKILLS } from '../data/skills';
import { Check, Sparkles, Sliders, Palette, Layers, User, Globe } from 'lucide-react';

interface ReadmeBuilderProps {
  config: ReadmeConfig;
  onChange: (newConfig: ReadmeConfig) => void;
  user: GitHubUser;
}

export const ReadmeBuilder: React.FC<ReadmeBuilderProps> = ({ config, onChange, user }) => {
  const [skillCategory, setSkillCategory] = useState<string>('all');
  const [skillSearch, setSkillSearch] = useState<string>('');

  const toggleSkill = (skillId: string) => {
    const isSelected = config.selectedSkills.includes(skillId);
    const updated = isSelected
      ? config.selectedSkills.filter(id => id !== skillId)
      : [...config.selectedSkills, skillId];
    onChange({ ...config, selectedSkills: updated });
  };

  const filteredSkills = POPULAR_SKILLS.filter(skill => {
    const matchesCat = skillCategory === 'all' || skill.category === skillCategory;
    const matchesSearch = skill.name.toLowerCase().includes(skillSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const STATS_THEMES = [
    { id: 'radical', name: 'Radical (Cyan/Pink)' },
    { id: 'dark', name: 'Dark Slate' },
    { id: 'tokyonight', name: 'Tokyo Night' },
    { id: 'synthwave', name: 'Synthwave' },
    { id: 'dracula', name: 'Dracula' },
    { id: 'github_dark', name: 'GitHub Dark' },
    { id: 'highcontrast', name: 'High Contrast' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Style & Identity */}
      <div className="rounded-2xl bg-slate-800/60 border border-slate-700/80 p-6 space-y-4 shadow-sm">
        <div className="flex items-center space-x-2 text-cyan-400">
          <User className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">Identity & Introduction</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={config.name}
              onChange={e => onChange({ ...config, name: e.target.value })}
              placeholder={user.name || 'Deepak Singh'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Professional Title / Tagline
            </label>
            <input
              type="text"
              value={config.title}
              onChange={e => onChange({ ...config, title: e.target.value })}
              placeholder="Full-Stack Developer & Open Source Enthusiast"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Header Display Style
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'minimal', label: 'Minimal Wave', desc: 'Hello World, I am...' },
              { id: 'wave', label: 'Centered Wave', desc: 'Hi there, I am...' },
              { id: 'typing', label: 'Typing SVG', desc: 'Animated typing banner' },
              { id: 'modern', label: 'Modern Clean', desc: 'Bold title banner' }
            ].map(style => (
              <button
                key={style.id}
                type="button"
                onClick={() => onChange({ ...config, headerStyle: style.id as any })}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  config.headerStyle === style.id
                    ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200 shadow-sm ring-1 ring-cyan-500/30'
                    : 'border-slate-700 bg-slate-900/40 text-slate-400 hover:border-slate-600'
                }`}
              >
                <div className="font-semibold text-xs text-white mb-0.5">{style.label}</div>
                <div className="text-[11px] text-slate-400">{style.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Short Bio / Philosophy
          </label>
          <textarea
            rows={2}
            value={config.aboutMe}
            onChange={e => onChange({ ...config, aboutMe: e.target.value })}
            placeholder="I build modern software products, explore new tech stacks, and contribute to open source."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Current Activities & Goals */}
      <div className="rounded-2xl bg-slate-800/60 border border-slate-700/80 p-6 space-y-4 shadow-sm">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Sliders className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">Current Activities & Focus</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              🔭 Currently Working On
            </label>
            <input
              type="text"
              value={config.workingOn}
              onChange={e => onChange({ ...config, workingOn: e.target.value })}
              placeholder="Building scalable web platforms"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              🌱 Currently Learning
            </label>
            <input
              type="text"
              value={config.learning}
              onChange={e => onChange({ ...config, learning: e.target.value })}
              placeholder="Next-gen AI workflows, Cloud infrastructure"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              💬 Ask Me About
            </label>
            <input
              type="text"
              value={config.askMeAbout}
              onChange={e => onChange({ ...config, askMeAbout: e.target.value })}
              placeholder="React, TypeScript, Node.js, Web Architecture"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              ⚡ Fun Fact
            </label>
            <input
              type="text"
              value={config.funFact}
              onChange={e => onChange({ ...config, funFact: e.target.value })}
              placeholder="I turn coffee into code and solutions!"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Skills & Tech Stack Selector */}
      <div className="rounded-2xl bg-slate-800/60 border border-slate-700/80 p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Layers className="w-5 h-5" />
            <h2 className="text-lg font-bold text-white">Tech Stack Badges</h2>
          </div>
          <div className="text-xs text-slate-400">
            {config.selectedSkills.length} selected
          </div>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-2 pt-1">
          {['all', 'frontend', 'backend', 'database', 'tools', 'cloud', 'devops'].map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSkillCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer ${
                skillCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-60 overflow-y-auto p-1 pr-2">
          {filteredSkills.map(skill => {
            const isSelected = config.selectedSkills.includes(skill.id);
            return (
              <button
                key={skill.id}
                type="button"
                onClick={() => toggleSkill(skill.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-500/80 text-cyan-200 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{skill.name}</span>
                <span className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                  isSelected ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700'
                }`}>
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* GitHub Widgets & Theme */}
      <div className="rounded-2xl bg-slate-800/60 border border-slate-700/80 p-6 space-y-4 shadow-sm">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Palette className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">GitHub Stats Cards & Theme</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="flex items-center space-x-3 p-3 rounded-xl bg-slate-900/50 border border-slate-700/60 cursor-pointer">
            <input
              type="checkbox"
              checked={config.showStatsCards}
              onChange={e => onChange({ ...config, showStatsCards: e.target.checked })}
              className="w-4 h-4 rounded accent-cyan-500"
            />
            <span className="text-xs font-medium text-slate-200">GitHub Stats Card</span>
          </label>

          <label className="flex items-center space-x-3 p-3 rounded-xl bg-slate-900/50 border border-slate-700/60 cursor-pointer">
            <input
              type="checkbox"
              checked={config.showStreakStats}
              onChange={e => onChange({ ...config, showStreakStats: e.target.checked })}
              className="w-4 h-4 rounded accent-cyan-500"
            />
            <span className="text-xs font-medium text-slate-200">Streak Stats Card</span>
          </label>

          <label className="flex items-center space-x-3 p-3 rounded-xl bg-slate-900/50 border border-slate-700/60 cursor-pointer">
            <input
              type="checkbox"
              checked={config.showTopLangs}
              onChange={e => onChange({ ...config, showTopLangs: e.target.checked })}
              className="w-4 h-4 rounded accent-cyan-500"
            />
            <span className="text-xs font-medium text-slate-200">Top Languages Card</span>
          </label>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Stats Cards Theme
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {STATS_THEMES.map(theme => (
              <button
                key={theme.id}
                type="button"
                onClick={() => onChange({ ...config, theme: theme.id })}
                className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-colors cursor-pointer ${
                  config.theme === theme.id
                    ? 'border-cyan-500 bg-cyan-950/60 text-cyan-200'
                    : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:border-slate-600'
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contact & Social Links */}
      <div className="rounded-2xl bg-slate-800/60 border border-slate-700/80 p-6 space-y-4 shadow-sm">
        <div className="flex items-center space-x-2 text-cyan-400">
          <Globe className="w-5 h-5" />
          <h2 className="text-lg font-bold text-white">Social & Connect Links</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Contact Email
            </label>
            <input
              type="email"
              value={config.email}
              onChange={e => onChange({ ...config, email: e.target.value })}
              placeholder="dpksingh624@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              LinkedIn (Username or URL)
            </label>
            <input
              type="text"
              value={config.linkedin}
              onChange={e => onChange({ ...config, linkedin: e.target.value })}
              placeholder="deepak-singh"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Twitter / X (Username)
            </label>
            <input
              type="text"
              value={config.twitter}
              onChange={e => onChange({ ...config, twitter: e.target.value })}
              placeholder="dpksingh624"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Portfolio Website
            </label>
            <input
              type="text"
              value={config.portfolio}
              onChange={e => onChange({ ...config, portfolio: e.target.value })}
              placeholder="dpksingh.dev"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
