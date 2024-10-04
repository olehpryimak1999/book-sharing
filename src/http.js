import axios from 'axios';
import store from './store';
import { HEADER_WITHOUT_AUTH } from '@/constants';

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

axios.interceptors.request.use(
    (config) => {
        if (!config.headers[HEADER_WITHOUT_AUTH]) {
            config.headers['Authorization'] = `${store.getters['auth/token']}`;
        } else {
            delete config.headers[HEADER_WITHOUT_AUTH];
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axios;
