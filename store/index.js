import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, combineReducers, applyMiddleware } from 'redux';

import currentContentReducer from './currentContent';
import contentListReducer from './contentList';

const logger = createLogger();

const reducers = combineReducers({ currentContentReducer, contentListReducer });

export default createStore(reducers, applyMiddleware(thunkMiddleware));
