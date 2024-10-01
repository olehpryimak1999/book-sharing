import axios from 'axios';
import store from './store';

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

axios.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = store.getters['auth/token'];

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axios;
