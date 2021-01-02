import { dispatch } from './store';

export const setOffline = () => dispatch({ type: 'OFFLINE', data: { online: false } });
export const setMessage = (message) => dispatch(message);