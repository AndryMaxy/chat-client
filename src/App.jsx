import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { setOnline } from './reducer.js';
import { runWebsoket, send } from './webSocketClient.js';

const App = (props) => {
    const inputRef = useRef(null);

    const login = () => {
        return (
            <div>
                <div>Please Enter your name</div>
                <input ref={inputRef} maxLength="10" id="name" type="text" />
                <button
                    id="confirm"
                    onClick={() => {
                        const name = inputRef.current.value;
                        if (name.length < 3) return;
                        props.setOnline(name);
                        runWebsoket(name);
                    }}
                >
                    Confirm
                </button>
            </div>
        );
    };

    const chat = () => {
        return (
            <div id="container">
                <div id="status">{props.name}, you are Online</div>
                <Messages messages={props.messages} />
                <input
                    type="text"
                    maxLength="60"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            const text = e.target.value;
                            if (!text.length) return;
                            const message = {
                                type: 'MESSAGE',
                                info: {
                                    name: props.name,
                                    text,
                                },
                            };
                            send(message);
                            e.target.value = '';
                        }
                    }}
                />
                <br></br>
                <br></br>
                <br></br>
                <div>Users online:</div>
                <div>
                    <ul>
                    {props.users.map(name => {
                        return <li>{name}</li>
                    })}
                    </ul>
                </div>
            </div>
        );
    };

    return props.online ? chat() : login();
};

const mapStateToProps = (state) => ({
    users: state.users,
    name: state.name,
    online: state.online,
    messages: state.messages,
});

export default connect(mapStateToProps, { setOnline })(App);

const Messages = ({ messages }) => {
    const message = (text) => <li key={text}>{text}</li>
    return (
        <div>
            <ul></ul>
            {messages.map((msg) => {
                switch (msg.type) {
                    case 'REGULAR':
                        return message(`${msg.name}: ${msg.text}`);
                    case 'CONNECTED':
                        return message(`${msg.name} is connected!`);
                    case 'DISCONNECTED':
                        return message(`${msg.name} is disconnected!`);
                }
            })}
        </div>
    );
};