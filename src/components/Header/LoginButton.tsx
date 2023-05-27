import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  title: string;
  onPress?: () => void;
};

const Login = (props: Props) => {
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
        style={styles.container}
        onPress={props.onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}>
        <Text style={styles.text}>{props.title}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F40000',
    justifyContent: 'center',
  },
  text: {
    paddingHorizontal: 20,
    fontFamily: 'Helvetica',
    fontWeight: '700',
    letterSpacing: -0.17,
    color: '#FFFFFF',
  },
});
