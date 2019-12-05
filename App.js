import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ReduxNetworkProvider } from 'react-native-offline';

import { store, persistor } from './store';
import Main from './screens/main';
import SwtichNavigator from './navigator/SwitchNavigator'

const newtworkProviderProps = {children: Main, pingOnlyWhenOffline: true, pingInBackground: true, pingInterval: 5000};
export default function App() {
  console.ignoredYellowBox = ['Setting a timer'];
  return (
    <Provider store={store} >
      <ReduxNetworkProvider props={newtworkProviderProps}>
        <PersistGate loading={null} persistor={persistor}>
          <SwtichNavigator />
        </PersistGate>
      </ReduxNetworkProvider>
    </Provider>
  );
}
