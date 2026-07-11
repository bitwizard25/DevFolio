// Single source of truth for site-wide constants (metadata, sitemap, socials)

export const siteUrl = 'https://rajbhoyar.dev';

export const siteName = 'Raj Bhoyar';
export const siteTitle = 'Raj Bhoyar | Full Stack Developer & AI Enthusiast';
export const siteDescription =
  'Full Stack Developer architecting scalable systems and intelligent agents. Node.js, MongoDB, RabbitMQ, and AI/LLM pipelines.';

export const socials = {
  github: 'https://github.com/bitwizard25',
  linkedin: 'https://linkedin.com/in/raj-bhoyar-b597b416a/',
  email: 'mailto:rbhoyar729@gmail.com',
};

// Resume hosted on Google Drive (shared "Anyone with the link" — required for the embed/download to work)
const RESUME_DRIVE_FILE_ID = '14mi-_EPkW1pjc50QrfVp9_0cTNh3vlqN';

export const resume = {
  // Drive's /preview endpoint is built for iframe embedding — no CORS issues, unlike fetching
  // the raw PDF bytes cross-origin (which is what the old react-pdf-based renderer needed).
  previewUrl: `https://drive.google.com/file/d/${RESUME_DRIVE_FILE_ID}/preview`,
  downloadUrl: `https://drive.google.com/uc?export=download&id=${RESUME_DRIVE_FILE_ID}`,
};
