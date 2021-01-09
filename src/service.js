import * as ax from 'axios';
import { response } from 'express';

const axios = ax.create({
    //withCredentials: true,
    baseURL: 'http://localhost:4300/',
    // headers:     {
    //     "API-KEY": "b1775b2f-c3a5-4509-8dc9-90b5629de7c3"
    // }
});

//axios.interceptors.response.use((res) => res.data);

export const getMessages = () => axios.get('/').then((res) => res.data);

export default axios;
