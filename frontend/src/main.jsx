import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import axios from 'axios';

// Set the base URL for all backend API calls
axios.defaults.baseURL = 'https://notes-taking-backend-weka.onrender.com';
// This is CRITICAL for sending cookies with every request
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
