import { GitHubUser, GitHubRepo } from '../types';

export const DEFAULT_USER: GitHubUser = {
  login: 'dpksingh624',
  id: 91102671,
  avatar_url: 'https://avatars.githubusercontent.com/u/91102671?v=4',
  html_url: 'https://github.com/dpksingh624',
  name: 'Deepak Singh',
  company: null,
  blog: '',
  location: 'Global',
  email: 'dpksingh624@gmail.com',
  bio: 'Full-stack developer building scalable web applications and open source tools.',
  twitter_username: null,
  public_repos: 1,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: '2021-09-21T00:55:43Z',
  updated_at: '2026-09-06T13:29:24Z'
};

export const DEFAULT_REPOS: GitHubRepo[] = [
  {
    id: 429480534,
    name: 'dpksingh624',
    full_name: 'dpksingh624/dpksingh624',
    html_url: 'https://github.com/dpksingh624/dpksingh624',
    description: 'Config files for my GitHub profile README repository.',
    fork: false,
    stargazers_count: 0,
    watchers_count: 0,
    language: 'Markdown',
    forks_count: 0,
    updated_at: '2026-03-01T04:37:42Z',
    topics: ['config', 'github-config', 'profile-readme'],
    default_branch: 'main'
  }
];

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
    if (!res.ok) {
      if (res.status === 403 || res.status === 404) {
        if (username.toLowerCase() === 'dpksingh624') {
          return DEFAULT_USER;
        }
        throw new Error(`User "${username}" not found or rate-limited`);
      }
      throw new Error(`GitHub API error: ${res.statusText}`);
    }
    const data = await res.json();
    return {
      ...data,
      name: data.name || (data.login === 'dpksingh624' ? 'Deepak Singh' : data.login),
      email: data.email || (data.login === 'dpksingh624' ? 'dpksingh624@gmail.com' : null),
      bio: data.bio || (data.login === 'dpksingh624' ? DEFAULT_USER.bio : '')
    };
  } catch (err) {
    console.warn('Using fallback user data:', err);
    if (username.toLowerCase() === 'dpksingh624') {
      return DEFAULT_USER;
    }
    throw err;
  }
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=20`);
    if (!res.ok) {
      if (username.toLowerCase() === 'dpksingh624') {
        return DEFAULT_REPOS;
      }
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : (username.toLowerCase() === 'dpksingh624' ? DEFAULT_REPOS : []);
  } catch (err) {
    console.warn('Using fallback repos data:', err);
    return username.toLowerCase() === 'dpksingh624' ? DEFAULT_REPOS : [];
  }
}
