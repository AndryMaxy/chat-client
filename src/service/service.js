import * as ax from 'axios';

const axios = ax.create({
    //withCredentials: true,
    baseURL: 'http://localhost:4500/',
    // headers:     {
    //     "API-KEY": "b1775b2f-c3a5-4509-8dc9-90b5629de7c3"
    // }
});

export const test = async () => {
    return await axios.post('/test').then((res) => res.data);
};

export const setAuthorizationToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);
    } else {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
    }
};

// axios.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     config.headers.Authorization = token ? `Bearer ${token}` : '';
//     return config;
// });

export const login = async (username, password) => {
    return await axios.post('/login', { username, password }).then((res) => res.data);
};

export const register = async (username, password) => {
    return await axios.post('/register', { username, password }).then((res) => res.data);
};

//axios.interceptors.response.use((res) => res.data);

export const getMessages = () => axios.get('/').then((res) => res.data);

export default axios;
