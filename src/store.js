import { createStore } from 'redux';
import reducer from './reducer.js';

const store = createStore(reducer);

export default store;

export const dispatch = (action) => store.dispatch(action);
