import {Animated, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Logo from '../../assets/logo.svg';
import LoginButton from './LoginButton';
import Profile from './Profile';
import {RootState} from '../../redux/reducers/authReducer';

type Props = {
  title: string;
  style: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Header = (props: Props) => {
  const {loggedIn} = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();

  return (
    <View style={[styles.container, {marginTop: useSafeAreaInsets().top + 10}]}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={styles.userContainer}>
        {!loggedIn && (
          <LoginButton
            title="Giriş Yap"
            onPress={() => dispatch({type: 'LOGIN'})}
          />
        )}
        <Profile
          loggedIn={loggedIn}
          online={loggedIn}
          onPress={() => dispatch({type: 'LOGOUT'})}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },

  logoContainer: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },

  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
