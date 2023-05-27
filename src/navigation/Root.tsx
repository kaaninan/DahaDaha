import * as React from 'react';
import {
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNBootSplash from 'react-native-bootsplash';

import BottomBar from './BottomBar';
import Promo from '../screens/Promo/Promo';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

// Deep Link Configuration
const linking: LinkingOptions<any> = {
  prefixes: ['dahadaha://'],
  config: {
    initialRouteName: 'BottomBar',
    screens: {
      BottomBar: {
        screens: {
          Explore: 'explore',
          Plus: 'plus',
          More: 'more',
        },
      },
      Promo: {
        path: 'campaign/:seoName/:id',
      },
    },
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
    <Stack.Screen
      name={'Promo'}
      component={Promo}
      options={({}) => ({
        headerShown: false,
      })}
    />
  </Stack.Navigator>
);

function Container() {
  return (
    <NavigationContainer
      linking={linking}
      theme={MyTheme}
      onReady={() => {
        setTimeout(() => {
          RNBootSplash.hide();
        }, 250);
      }}>
      <AppStack />
    </NavigationContainer>
  );
}

export default Container;
