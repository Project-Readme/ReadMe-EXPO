import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import {AsyncStorage} from 'react-native';
import {reducer as network } from 'react-native-offline';

import currentContentReducer from './currentContent';
import contentListReducer from './contentList';
import mostPopularReducer from './mostPopularList';
import mostRecentReducer from './mostRecentList';
import recommendedReducer from './recommendedList';
import userReducer from './user';

const logger = createLogger();

const rootReducer = combineReducers({
    currentContent: currentContentReducer,
    contentList: contentListReducer,
    mostPopularList: mostPopularReducer,
    mostRecentList: mostRecentReducer,
    recommendedList: recommendedReducer,
    user: userReducer,
    network,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
  }

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleware)
);
export const persistor = persistStore(store);
