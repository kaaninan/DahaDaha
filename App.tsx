import * as React from 'react';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigator from './src/navigation/Root';
import {store} from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Navigator />
      </GestureHandlerRootView>
    </Provider>
  );
}
