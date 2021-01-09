import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './Component.jsx';
import { Provider } from 'react-redux';
import store from '../store.js';
import {runWebsoket} from '../WebSocket.js';


//const store = initStore();
const data = window['Server/Data'];
console.log(data);
const send = runWebsoket();

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <Chat send={send} />
    </Provider>,
    rootElement
);