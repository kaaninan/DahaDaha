import * as React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNBootSplash from 'react-native-bootsplash';

import BottomBar from './BottomBar';
import Promo from '../screens/Promo/Promo';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 255, 255)',
    background: 'white',
  },
};

const Stack = createNativeStackNavigator();

export const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={'BottomBar'}
      component={BottomBar}
      options={({}) => ({
        headerShown: false,
      })}
    />
    <Stack.Screen name={'Promo'} component={Promo} />
  </Stack.Navigator>
);

function Container() {
  return (
    <NavigationContainer
      theme={MyTheme}
      onReady={() => {
        RNBootSplash.hide({fade: true});
      }}>
      <AppStack />
    </NavigationContainer>
  );
}

export default Container;
