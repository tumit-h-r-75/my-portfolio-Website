// Local dev: set VITE_API_URL in .env.development.local (e.g. http://localhost:5000).
// Production build falls back to the deployed backend.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://protfolio-back-alpha.vercel.app';

const splitList = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

export const mapProjectFromApi = (project, index = 0) => ({
  id: project._id || project.id || String(index + 1),
  serial: index + 1,
  name: project.title || project.name || 'Untitled Project',
  image: project.imageUrl || project.image || '',
  techStack: splitList(project.tags || project.techStack),
  description: project.description || '',
  features: splitList(project.features),
  liveLink: project.liveLink || '',
  githubClient: project.githubLink || project.githubClient || '',
  challenges: project.challenges || '',
  futurePlans: project.futurePlans || '',
});

export const publicApi = {
  getProjects: async () => {
    const response = await fetch(`${API_BASE_URL}/api/projects`);
    if (!response.ok) throw new Error('Unable to load projects.');
    const data = await response.json();
    return data.map(mapProjectFromApi);
  },
  getSkills: async () => {
    const response = await fetch(`${API_BASE_URL}/api/skills`);
    if (!response.ok) throw new Error('Unable to load skills.');
    return response.json();
  },
  // Contact form → backend (Nodemailer) → email to owner + auto-reply to sender
  sendContactMessage: async (payload) => {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    let data = {};
    try {
      data = await response.json();
    } catch {
      // non-JSON error page — keep the generic message below
    }
    if (!response.ok) throw new Error(data.msg || 'Unable to send your message.');
    return data;
  },
};
