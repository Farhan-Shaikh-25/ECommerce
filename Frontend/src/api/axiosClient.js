import axios from 'axios';

const axiosClient = axios.create({
  // Use relative path in production, localhost in development
  baseURL: import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:5000/api',
});

// Intercept requests and add the auth header
axiosClient.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;