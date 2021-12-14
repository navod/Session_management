/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import Navigation from './App/config/Navigation';
import {Store} from './App/redux/store';

const App = () => {
  return (
    <Provider store={Store}>
      <Navigation />
    </Provider>
  );
};

export default App;
