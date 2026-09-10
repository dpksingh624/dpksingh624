export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  updated_at: string;
  topics?: string[];
  default_branch: string;
}

export interface SkillCategory {
  name: string;
  skills: SkillItem[];
}

export interface SkillItem {
  id: string;
  name: string;
  badgeUrl: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'cloud' | 'devops';
  iconName?: string;
}

export interface ReadmeConfig {
  name: string;
  title: string;
  currentRole: string;
  aboutMe: string;
  workingOn: string;
  workingOnUrl: string;
  learning: string;
  collaborateOn: string;
  askMeAbout: string;
  funFact: string;
  email: string;
  linkedin: string;
  twitter: string;
  portfolio: string;
  selectedSkills: string[];
  showStatsCards: boolean;
  showStreakStats: boolean;
  showTopLangs: boolean;
  showActivityGraph: boolean;
  theme: string;
  headerStyle: 'minimal' | 'wave' | 'modern' | 'typing';
}
