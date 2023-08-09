import axios from 'axios';



const api = axios.create({
    baseURL:"http://192.168.1.190:3001", // Set the base URL to your server endpoint
});
const token=localStorage.jwt;
console.log('from axios file : ',token )
api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default api;
