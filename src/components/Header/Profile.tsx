import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import ProfileIcon from '../../assets/icons/profile.svg';

type Props = {
  loggedIn: boolean;
  online: boolean;
};

const Profile = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        {backgroundColor: props.loggedIn ? '#F40000' : '#1D1E1C'},
      ]}>
      <ProfileIcon />
      {props.online && <View style={styles.badge} />}
    </TouchableOpacity>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  badge: {
    width: 12,
    height: 12,
    borderRadius: 12,
    borderWidth: 2.18,
    backgroundColor: '#009639',
    borderColor: '#FFFFFF',
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
