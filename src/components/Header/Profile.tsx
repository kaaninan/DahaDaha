import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ProfileIcon from '../../assets/icons/profile.svg';
import {theme} from '../../styles/theme';

type Props = {
  loggedIn: boolean;
  online: boolean;
  onPress: () => void;
};

const Profile = (props: Props) => {
  const animatedValue = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: animatedValue.value}],
    };
  });

  const onPressIn = () => {
    animatedValue.value = withTiming(0.98, {
      duration: 100,
    });
  };

  const onPressOut = () => {
    animatedValue.value = withTiming(1, {
      duration: 100,
    });
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={props.onPress}
        style={[
          styles.container,
          {
            backgroundColor: props.loggedIn
              ? theme.colors.primary
              : theme.colors.dark,
          },
        ]}>
        <ProfileIcon />
        {props.online && <View style={styles.badge} />}
      </Pressable>
    </Animated.View>
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
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.light,
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
