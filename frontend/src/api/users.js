import axios from 'axios';

export const loginUser = async (credentials) => {
  const { data } = await axios.post('/api/users/login', credentials);
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await axios.post('/api/users/register', userData);
  return data;
};

export const logoutUser = async () => {
  const { data } = await axios.post('/api/users/logout');
  return data;
};