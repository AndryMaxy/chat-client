import React from 'react';
import { connect } from 'react-redux';
import { runWebsoket } from './WebSocket.js';
import { setOffline, setMessage } from './reducer';

class WebSocket extends React.Component {
    constructor(props) {
        super(props);
        const params = {
            name: props.name,
            setMessage: props.setMessage,
            setOffline: props.setOffline,
        };
        this.send = runWebsoket(params);
    }

    render() {
        return React.Children.map(this.props.children, (child) => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, { send: this.send });
            }
            return child;
        });
    }
}

const mapStateToProps = (state) => ({
    name: state.name,
});

export default connect(mapStateToProps, { setOffline, setMessage })(WebSocket);
