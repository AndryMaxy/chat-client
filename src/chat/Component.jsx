import React, { useRef } from 'react';
import { connect } from 'react-redux';

const App = (props) => {
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
                            type: 'REGULAR',
                            info: {
                                name: props.name,
                                text,
                            },
                        };
                        props.send(message);
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
                {props.users.map((name, i) => {
                    return <li key={i + name + Date.now()}>{name}</li>
                })}
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    users: state.users,
    name: state.name,
    online: state.online,
    messages: state.messages,
});

export default connect(mapStateToProps, {})(App);

const Messages = ({ messages }) => {
    const message = (i, text) => <li key={i + text + Date.now()}>{text}</li>
    return (
        <div>
            <ul>
            {messages.map(({type, info}, i) => {
                switch (type) {
                    case 'REGULAR':
                        return message(i,`${info.name}: ${info.text}`);
                    case 'CONNECTED':
                        return message(i,`${info.name} is connected!`);
                    case 'DISCONNECTED':
                        return message(i,`${info.name} is disconnected!`);
                }
            })}
            </ul>
        </div>
    );
};
