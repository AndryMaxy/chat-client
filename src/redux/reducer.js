import path from 'path';
import { setLogin } from './actions.js';
import * as Service from './../service/service.js';

const initialState = {
    username: '',
    online: false,
    messages: [],
    typing: '',
    users: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TYPING':
            return { ...state, ...action.payload };
        case 'LOGIN':
            return { ...state, ...action.payload };
    }

    if (state.online) {
        switch (action.type) {
            case 'MESSAGES':
                soundMessage();
                return { ...state, messages: action.info.messages };
            default:
                return state;
        }
    } else {
        switch (action.type) {
            case 'ONLINE':
                return { ...state, ...action.info, online: true };
            default:
                return state;
        }
    }
};

const soundMessage = () => {
    if (document.visibilityState === 'hidden') {
        const dirname = path.dirname(import.meta.url);
        new Audio(path.resolve(dirname, '/assets/msg.mp3')).play();
    }
};

export const login = (username, password) => async (dispatch) => {
    const data = await Service.login(username, password);

    if (data.token) {
        Service.setAuthorizationToken(data.token);
        dispatch(setLogin(username));
        return Promise.resolve();
    } else {
        return Promise.reject();
    }
};

export const register = (username, password) => async (dispatch) => {
    const data = await Service.register(username, password);

    if (data.token) {
        Service.setAuthorizationToken(data.token);
        dispatch(setLogin(username));
        return Promise.resolve();
    } else {
        return Promise.reject();
    }
};

export default reducer;
