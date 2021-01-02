import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store.js';
import {runWebsoket} from './WebSocket.js';

const send = runWebsoket();

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <App send={send} />
    </Provider>,
    rootElement
);