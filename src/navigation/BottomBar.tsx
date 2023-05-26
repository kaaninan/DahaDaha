import * as React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getHeaderTitle} from '@react-navigation/elements';

import Header from '../components/Header/Header';

import Explore from '../screens/Home/Explore';
import Plus from '../screens/Home/Plus';
import More from '../screens/Home/More';

import ExploreIcon from '../assets/icons/explore.svg';
import MoreIcon from '../assets/icons/more.svg';
const PlusIcon = (
  <Image
    source={require('../assets/icons/portal.png')}
    style={{
      width: 73,
      height: 77,
      marginTop: -20,
    }}
  />
);

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        header: ({navigation, route, options}) => {
          const title = getHeaderTitle(options, route.name);
          return <Header title={title} style={options.headerStyle} />;
        },
        tabBarIcon: ({focused}) => {
          let icon;
          switch (route.name) {
            case 'Explore':
              icon = (
                <ExploreIcon
                  fill={focused ? '#000000' : '#BBBBBB'}
                  style={{marginTop: 6}}
                />
              );
              break;

            case 'Plus':
              // icon = PlusIcon;
              break;

            case 'More':
              icon = <MoreIcon fill={focused ? '#000000' : '#BBBBBB'} />;
              break;

            default:
              break;
          }
          return icon;
        },

        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#BBBBBB',

        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: 'Helvetica',
          fontWeight: '700',
          paddingBottom: 12,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },

        tabBarStyle: {
          height: useSafeAreaInsets().bottom + 68,
          borderTopWidth: 0,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,

          // iOS Shadow
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowColor: 'black',
          shadowRadius: 5,
          shadowOpacity: 0.1,

          // Android Shadow
          elevation: 30,
        },
      })}>
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={({}) => ({
          title: 'Keşfet',
          // headerShown: false,
        })}
      />
      <Tab.Screen
        name="Plus"
        component={Plus}
        options={{
          tabBarIcon: () => PlusIcon,
          tabBarLabel: () => null,
          tabBarButton(props) {
            return (
              <TouchableOpacity
                {...props}
                style={{width: 73}}
                activeOpacity={0.8}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          title: 'Daha Cüzdan',
        }}
      />
    </Tab.Navigator>
  );
};
