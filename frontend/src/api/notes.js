import axios from 'axios';

export const getNotes = async () => {
  const { data } = await axios.get('/api/notes');
  return data;
};

export const createNote = async (noteData) => {
  const { data } = await axios.post('/api/notes', noteData);
  return data;
};

export const updateNote = async (noteId, noteData) => {
  const { data } = await axios.put(`/api/notes/${noteId}`, noteData);
  return data;
};

export const deleteNote = async (noteId) => {
  const { data } = await axios.delete(`/api/notes/${noteId}`);
  return data;
};