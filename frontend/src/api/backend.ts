import axios from 'axios';

const backendInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

export default backendInstance;
