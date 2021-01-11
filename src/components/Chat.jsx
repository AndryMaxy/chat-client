import React, { useRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setTyping } from '../redux/actions.js';

const Chat = (props) => {
    return (
        <div id="container">
            <div id="status">{props.username}, you are Online</div>
            <Messages messages={props.messages} />
            <input
                type="text"
                maxLength="60"
                onChange={(e) => {
                    const text = e.target.value;
                    props.setTyping(text);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        const text = e.target.value;
                        if (!text.length) return;
                        const message = {
                            type: 'REGULAR',
                            info: {
                                username: props.username,
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
            <Link to={'/test'}>Test</Link>
            <div>Users online:</div>
            <div>
                <ul>
                    {props.users.map((username, i) => {
                        return <li key={i + username + Date.now()}>{username}</li>;
                    })}
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    typing: state.typing,
    users: state.users,
    username: state.username,
    online: state.online,
    messages: state.messages,
});

export default connect(mapStateToProps, { setTyping })(Chat);

const Messages = ({ messages }) => {
    const message = (i, text) => <li key={i + text + Date.now()}>{text}</li>;
    return (
        <div>
            <ul>
                {messages.map(({ type, info }, i) => {
                    switch (type) {
                        case 'REGULAR':
                            return message(i, `${info.username}: ${info.text}`);
                        case 'CONNECTED':
                            return message(i, `${info.username} is connected!`);
                        case 'DISCONNECTED':
                            return message(i, `${info.username} is disconnected!`);
                    }
                })}
            </ul>
        </div>
    );
};
