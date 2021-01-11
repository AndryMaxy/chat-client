import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { setAuthorizationToken } from './../service/service.js';
import Login from './Login.jsx';
import Chat from './Chat.jsx';
import Test from './Test.jsx';
import Register from './Register.jsx';
import store from '../redux/store.js';
import withWebSocket from './withWebSocket.jsx';

const token = localStorage.getItem('token');
if (token) {
    setAuthorizationToken(token);
    console.log('token = ' + jwtDecode(token));
    //store.dispatch();
}

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path={'/login'} component={Login} />
                    <Route path={'/chat'} component={withWebSocket(Chat)} />
                    <Route path={'/test'} component={Test} />
                    <Route path={'/signup'} component={Register} />
                    <Route exact path={'/'}>
                        <Redirect to="/login" />
                    </Route>
                    <Route exact path={'*'}>
                        <Redirect to="/login" />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
