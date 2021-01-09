import { applyMiddleware, createStore } from 'redux';
//import thunkMiddleware from "redux-thunk";
import reducer from './reducer.js';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export const dispatch = (action) => store.dispatch(action);
