import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ReduxNetworkProvider } from 'react-native-offline';

import { store, persistor } from './store';
import Main from './components/main';

const newtworkProviderProps = {children: Main, pingOnlyWhenOffline: true, pingInBackground: true, pingInterval: 5000};
export default function App() {
  return (
    <Provider store={store} >
      <ReduxNetworkProvider props={newtworkProviderProps}>
        <PersistGate loading={null} persistor={persistor}>
          <Main />
        </PersistGate>
      </ReduxNetworkProvider>
    </Provider>
  );
}

