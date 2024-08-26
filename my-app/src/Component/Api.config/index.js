import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sever-site.onrender.com'
});

export default api;