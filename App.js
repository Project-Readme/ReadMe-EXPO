import React from 'react';

import { Provider } from 'react-redux';
<<<<<<< HEAD
=======
import { PersistGate } from 'redux-persist/integration/react';
>>>>>>> 365e60a5531500b293c231ce3d4acc3d2bc48f49

import { store, persistor } from './store';
import Main from './components/main';


export default function App() {
  return (
<<<<<<< HEAD
    <Provider store={store}>
      <Main />
=======
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
>>>>>>> 365e60a5531500b293c231ce3d4acc3d2bc48f49
    </Provider>
  );
}
