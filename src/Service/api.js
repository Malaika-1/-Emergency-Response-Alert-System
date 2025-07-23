import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// USER
export const register = (userData) => API.post('/user/register', userData);
export const login = (credentials) => API.post('/user/login', credentials);

// REPORT
export const submitReport = (reportData) => API.post('/report/submit', reportData);
export const getRecentReports = () => API.get('/report/recent');
export const getUserReports = (email) => API.get(`/report/user/${email}`);
