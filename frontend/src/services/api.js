import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const register = (data) => api.post('/users/register', data);
export const login = (data) => api.post('/users/login', data);
export const uploadVideo = (formData, config) => api.post('/videos/upload', formData, config);
export const streamVideo = (filename) => api.get(`/videos/stream/${filename}`, { responseType: 'blob' });
export const searchVideos = (query) => api.get(`/videos/search/${query}`);
export const getVideoDetails = (id) => api.get(`/videos/${id}`);
