import axios from 'axios';
import { parseCookies } from 'nookies';

export function getAPIClient(ctx?: any) {
    const {'nextauth.token' : token} = parseCookies(ctx);

    let configs = {
        baseURL: process.env.NEXT_PUBLIC_URL_API
    };
    
    if (token && axios.defaults.headers != null) {
        configs = {...configs, ...{
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        }}
    }

    const api = axios.create(configs);

    api.interceptors.request.use(config => {
        return config;
    });

    return api;
}