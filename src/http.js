import axios from 'axios';

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export default axios;
