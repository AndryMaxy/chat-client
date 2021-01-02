import ip from 'ip';
import { setOffline, setMessage } from './Actions';

export const runWebsoket = () => {
    //const ipAddress = ip.address('public', 'ipv4');
    const ipAddress = `18.222.169.239`;
    const ws = new WebSocket(`ws://${ipAddress}:3003`);

    const send = (msg) => ws.send(JSON.stringify(msg));

    ws.onmessage = (response) => {
        const message = JSON.parse(response.data);
        const { type, info } = message;
        setMessage({ type, data: info });
    };

    const interval = setInterval(() => {
        send({ type: 'STATUS' });
    }, 30000);

    ws.onclose = () => {
        setOffline();
        clearInterval(interval);
    };

    return send;
};
