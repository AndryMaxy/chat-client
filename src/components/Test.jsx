import React from 'react';
import * as Service from './../service/service.js';
import { Link } from 'react-router-dom';

const Test = (props) => {
    return (
        <div id="container">
            <div>Nothing</div>
            <Link to={'/chat'}>Chat</Link>
            <button onClick={() => {
                Service.test();
            }}>test</button>
        </div>
    );
};

export default Test;
