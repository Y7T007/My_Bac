import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:3001', // Set the base URL to the proxy path
});

export default api;
