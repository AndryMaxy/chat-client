import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { register } from '../redux/reducer.js';

const Register = (props) => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    return (
        <div>
            <div>Please Register</div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const username = usernameRef.current.value;
                    const password = passwordRef.current.value;
                    if (username.length < 3 || password.length < 5) {
                        return;
                    }
                    props
                        .register(username, password)
                        .then(() => {
                            props.history.push('/chat');
                        })
                        .catch(() => {
                            console.log('wtf');
                        });
                }}
            >
                <div>
                    <input
                        ref={usernameRef}
                        minLength="3"
                        maxLength="10"
                        type="text"
                        name="username"
                        required
                    />
                </div>
                <div>
                    <input
                        ref={passwordRef}
                        minLength="5"
                        maxLength="10"
                        type="password"
                        name="password"
                        required
                    />
                </div>
                <div>
                    <button id="confirm" type="submit">
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    );
};

export default connect(null, { register })(Register);
