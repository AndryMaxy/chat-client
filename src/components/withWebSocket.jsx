import React, { useState, useEffect } from 'react';
import { runWebsoket } from '../service/WebSocket.js';

const withWebSocket = (Component) => () => {
    const [ws] = useState(runWebsoket());

    useEffect(() => () => ws.close(), [ws]);

    return <Component ws={ws} />;
};

export default withWebSocket;
