import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import currentContentReducer from './currentContent';
import contentListReducer from './contentList';
import mostPopularReducer from './mostPopularList';
import userReducer from './user';

const logger = createLogger();

const rootReducer = combineReducers({
  currentContent: currentContentReducer,
  contentList: contentListReducer,
  mostPopularList: mostPopularReducer,
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleware)
);
export const persistor = persistStore(store);
