import { dispatch } from './store';
import { setOffline } from './reducer';

export let send;

export const runWebsoket = (name) => {
    //const ws = new WebSocket('ws://52.14.207.216:3003');
    const ws = new WebSocket('ws://localhost:3003');

    ws.onopen = () => {
        send({ type: 'LOGIN', name });
    };

    ws.onmessage = (response) => {
        const message = JSON.parse(response.data);
        const { type, info } = message;
        dispatch({ type, data: info });
    };

    let interval = setInterval(() => {
        send({ type: 'STATUS' });
    }, 30000);

    send = (msg) => {
        ws.send(JSON.stringify(msg));
    };

    ws.onclose = () => {
        send({ type: 'BYE' });
        dispatch(setOffline());
        clearInterval(interval);
    };
};
