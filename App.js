/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Navigation from './Navigation/Navigation';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';


const App = () => {
	let persistor = persistStore(store);
  return (
  	<Provider store={store}>
  		<PersistGate persistor={persistor}>
  			<Navigation />
  		</PersistGate>
  	</Provider>
  );
};


export default App;
