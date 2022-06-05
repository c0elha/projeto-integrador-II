import axios from 'axios';
import { parseCookies } from 'nookies';

export function getAPIClient(ctx?: any) {
    const {'nextauth.token' : token} = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/'
    });

    api.interceptors.request.use(config => {
        return config;
    });
    
    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return api;
}