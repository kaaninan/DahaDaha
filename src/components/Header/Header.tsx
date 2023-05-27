import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Logo from '../../assets/logo.svg';
import LoginButton from './LoginButton';
import {RootState} from '../../redux/reducers/index';
import Profile from './Profile';

const Header = () => {
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
    justifyContent: 'center',
  },

  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
