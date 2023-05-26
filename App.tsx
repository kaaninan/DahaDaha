import * as React from 'react';
import Navigator from './src/navigation/Root';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Navigator />
    </GestureHandlerRootView>
  );
}
