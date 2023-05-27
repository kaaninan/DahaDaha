import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import BackArrow from '../../assets/icons/back.svg';

type Props = {
  onPress?: () => void;
};

const BackButton = (props: Props) => {
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
        <BackArrow />
      </Pressable>
    </Animated.View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1E1C',
  },
});
