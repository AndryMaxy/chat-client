import React, { useRef } from 'react';

const Login = (props) => {
    const inputRef = useRef(null);

    return (
        <div>
            <div>Please Enter your name</div>
            <form action="/login" method='POST' onSubmit={(e) => {
                const name = inputRef.current.value;
                if (name.length < 3) {
                    e.preventDefault();
                    return
                }
            }}>
                <input ref={inputRef} maxLength="10" id="name" type="text" name='username' required />
                <button
                    id="confirm"
                    type='submit'
                >
                    Confirm
                </button>
            </form>
        </div>
    );
};

export default Login;
