const API_BASE_URL = 'https://protfolio-back-alpha.vercel.app';

export const ApiClient = {
  get: async (url) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: token ? { 'x-auth-token': token } : {},
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      sessionStorage.setItem('dashboardAuthMessage', 'Session expired. Please login again.');
      window.location.assign('/login');
      throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
      let message = 'Unable to load dashboard data.';
      try {
        const data = await response.json();
        message = data.msg || data.message || message;
      } catch {
        // Keep the friendly fallback when the server does not return JSON.
      }
      throw new Error(message);
    }

    return response.json();
  },
};
