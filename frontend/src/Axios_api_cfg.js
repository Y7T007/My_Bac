import axios from 'axios';

// Determine the base URL dynamically
let baseURL = 'http://localhost:3001'; // Default to localhost

// Check if the window location is not localhost
if (window.location.hostname !== 'localhost') {
    // Use the window location's hostname and port
    baseURL = `http://${window.location.hostname}:${window.location.port}`;
}

const api = axios.create({
    baseURL: baseURL,
});

const token = localStorage.jwt;
console.log('from axios file: ', token);
api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default api;
