import { createStore } from 'redux';
import flowersApp from './reducers';

const store = createStore(flowersApp);

export default store;