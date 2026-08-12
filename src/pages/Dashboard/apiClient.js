export const API_BASE_URL = 'https://protfolio-back-alpha.vercel.app';

const request = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    ...(token ? { 'x-auth-token': token } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem('token');
    sessionStorage.setItem('dashboardAuthMessage', 'Session expired. Please login again.');
    window.location.assign('/login');
    throw new Error('Session expired. Please login again.');
  }

  if (!response.ok) {
    let message = 'Unable to update dashboard data.';
    try {
      const data = await response.json();
      message = data.msg || data.message || message;
    } catch {
      // Keep the friendly fallback when the server does not return JSON.
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
};

export const ApiClient = {
  get: (url) => request(url),
  post: (url, body) => request(url, { method: 'POST', body }),
  put: (url, body) => request(url, { method: 'PUT', body }),
  delete: (url, body) =>
    request(url, {
      method: 'DELETE',
      headers: body ? { 'Content-Type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined,
    }),
};
