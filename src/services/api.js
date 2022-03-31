import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000', /// Emulador de Android
  // baseURL: 'http://localhost:3000', /// MAC ios
  // baseURL: 'http://10.0.3.2:3000', /// Emulador de Genymotion
  // baseURL: 'iplocal:3000', /// USB
});

export default api;
