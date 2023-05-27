import {
  ImageRequireSource,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FastImage, {Source} from 'react-native-fast-image';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {theme} from '../../../../styles/theme';

type Props = {
  id: number;
  source: Source | ImageRequireSource;
  title: string;
  selected?: boolean;
  onPress: (id: number) => void;
  selectable?: boolean;
};

const Tag = (props: Props) => {
  const animatedValue = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: animatedValue.value}],
    };
  });

  const onPressIn = () => {
    animatedValue.value = withTiming(0.95, {
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
      <TouchableOpacity
        onPress={() => props.onPress(props.id)}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[
          styles.container,
          {
            borderColor:
              props.selected && props.selectable
                ? theme.colors.primary
                : theme.colors.border,
          },
        ]}
        activeOpacity={1}>
        <FastImage
          key={props.id}
          style={styles.icon}
          source={props.source}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    height: 36,
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: 8,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: 24,
    height: 24,
    marginLeft: 6,
    borderRadius: 7.2,
  },

  text: {
    fontFamily: theme.font.primary,
    fontWeight: '400',
    fontSize: 12,
    paddingHorizontal: 10,
    color: '#000000',
  },
});
