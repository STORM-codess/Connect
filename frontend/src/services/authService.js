import api from './axios';

// Login/Register are primarily handled in AuthContext, 
// but we leave these here for modularity if components want to ping directly.

export const loginUser = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post('/auth/register', data);
  return res.data;
};

export const getProfile = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};
