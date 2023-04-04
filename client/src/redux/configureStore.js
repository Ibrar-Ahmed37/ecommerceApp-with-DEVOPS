import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {userId: 'avc'}
const middleware = [thunk];

const store = createStore(rootReducer,  initialState, applyMiddleware(...middleware));


export default store;
