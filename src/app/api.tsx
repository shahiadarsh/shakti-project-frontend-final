import axios from 'axios';
import { store } from './store';

const api = axios.create({
    baseURL: "https://shakti-project-backend-cmtai.vercel.app/api/v1",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
