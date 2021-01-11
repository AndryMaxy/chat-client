// import { dispatch } from './store';

// export const setOffline = () => dispatch({ type: 'OFFLINE', data: { online: false } });
// export const setMessage = (message) => dispatch(message);
// export const setMessages = (message) => dispatch(message);
export const setTyping = (typing) => ({ type: 'TYPING', payload: { typing } });
export const setLogin = (username) => ({ type: 'LOGIN', payload: { username } });
