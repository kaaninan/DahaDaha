import {Pressable, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const Button = (props: Props) => {
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
    <Animated.View style={[animatedStyle, props.style]}>
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

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 100,
    backgroundColor: '#F40000',
    justifyContent: 'center',
  },
  text: {
    paddingHorizontal: 20,
    fontFamily: 'Helvetica',
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
