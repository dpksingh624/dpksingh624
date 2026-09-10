import { ReadmeConfig, GitHubUser } from '../types';
import { POPULAR_SKILLS } from '../data/skills';

export function generateReadmeMarkdown(config: ReadmeConfig, user: GitHubUser): string {
  const username = user.login || 'dpksingh624';
  const name = config.name || user.name || 'Deepak Singh';
  const theme = config.theme || 'radical';

  let md = '';

  // Header section
  if (config.headerStyle === 'wave') {
    md += `### <div align="center">👋 Hi there, I'm **${name}**</div>\n\n`;
  } else if (config.headerStyle === 'typing') {
    const line1 = encodeURIComponent(config.title || 'Full-Stack Developer');
    const line2 = encodeURIComponent('Passionate Open Source Contributor');
    const line3 = encodeURIComponent('Building modern web apps');
    md += `<div align="center">\n\n`;
    md += `# 🚀 ${name}\n\n`;
    md += `[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=22C55E&center=true&vCenter=true&width=435&lines=${line1};${line2};${line3})](https://git.io/typing-svg)\n\n`;
    md += `</div>\n\n`;
  } else {
    md += `# Hello World, I'm ${name} 👋\n\n`;
    if (config.title) {
      md += `**${config.title}**\n\n`;
    }
  }

  // About Me Section
  if (config.aboutMe) {
    md += `> ${config.aboutMe}\n\n`;
  }

  md += `## 👨‍💻 About Me\n\n`;
  if (config.workingOn) {
    md += `- 🔭 I'm currently working on ${config.workingOnUrl ? `[**${config.workingOn}**](${config.workingOnUrl})` : `**${config.workingOn}**`}\n`;
  }
  if (config.learning) {
    md += `- 🌱 I'm currently learning **${config.learning}**\n`;
  }
  if (config.collaborateOn) {
    md += `- 👯 I'm looking to collaborate on **${config.collaborateOn}**\n`;
  }
  if (config.askMeAbout) {
    md += `- 💬 Ask me about **${config.askMeAbout}**\n`;
  }
  if (config.email) {
    md += `- 📫 How to reach me: [**${config.email}**](mailto:${config.email})\n`;
  }
  if (config.funFact) {
    md += `- ⚡ Fun fact: **${config.funFact}**\n`;
  }
  md += `\n`;

  // Tech Stack / Skills
  if (config.selectedSkills.length > 0) {
    md += `## 🛠️ Languages & Tools\n\n`;
    md += `<p align="left">\n`;
    const selectedBadgeList = POPULAR_SKILLS.filter(s => config.selectedSkills.includes(s.id));
    selectedBadgeList.forEach(s => {
      md += `  <img src="${s.badgeUrl}" alt="${s.name}" height="28" style="margin: 2px;" />\n`;
    });
    md += `</p>\n\n`;
  }

  // GitHub Stats
  if (config.showStatsCards || config.showTopLangs || config.showStreakStats) {
    md += `## 📊 GitHub Statistics\n\n`;
    md += `<p align="center">\n`;

    if (config.showStatsCards) {
      md += `  <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${theme}&hide_border=false" alt="${username}'s GitHub stats" />\n`;
    }

    if (config.showTopLangs) {
      md += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${theme}&hide_border=false" alt="Top Languages" />\n`;
    }

    if (config.showStreakStats) {
      md += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${theme}&hide_border=false" alt="GitHub Streak" />\n`;
    }

    md += `</p>\n\n`;
  }

  // Social & Connect
  const socials: { label: string; url: string; badge: string }[] = [];
  if (config.linkedin) {
    socials.push({
      label: 'LinkedIn',
      url: config.linkedin.startsWith('http') ? config.linkedin : `https://linkedin.com/in/${config.linkedin}`,
      badge: 'https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white'
    });
  }
  if (config.twitter) {
    socials.push({
      label: 'Twitter',
      url: config.twitter.startsWith('http') ? config.twitter : `https://twitter.com/${config.twitter.replace('@', '')}`,
      badge: 'https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white'
    });
  }
  if (config.portfolio) {
    socials.push({
      label: 'Portfolio',
      url: config.portfolio.startsWith('http') ? config.portfolio : `https://${config.portfolio}`,
      badge: 'https://img.shields.io/badge/Website-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white'
    });
  }
  if (config.email) {
    socials.push({
      label: 'Email',
      url: `mailto:${config.email}`,
      badge: 'https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white'
    });
  }

  if (socials.length > 0) {
    md += `## 🌐 Connect with Me\n\n`;
    md += `<p align="left">\n`;
    socials.forEach(s => {
      md += `  <a href="${s.url}" target="_blank">\n    <img src="${s.badge}" alt="${s.label}" style="margin: 2px;" />\n  </a>\n`;
    });
    md += `</p>\n\n`;
  }

  md += `---\n<div align="center">⭐️ From [${username}](https://github.com/${username})</div>\n`;

  return md;
}
