import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, combineReducers, applyMiddleware } from 'redux';

import currentContentReducer from './currentContent';
import contentListReducer from './contentList';
import mostPopularReducer from './mostPopular';

const logger = createLogger();

const reducers = combineReducers({
    currentContent: currentContentReducer,
    contentList: contentListReducer,
    mostPopularList: mostPopularReducer,
});


export default createStore(reducers, applyMiddleware(thunkMiddleware));
