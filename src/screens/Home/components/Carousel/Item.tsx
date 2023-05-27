import React from 'react';
import {
  StyleProp,
  ViewStyle,
  ViewProps,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  Platform,
  Pressable,
} from 'react-native';
import {
  AnimateProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {decode} from 'html-entities';

import BackLayer from '../../../../assets/backLayer.svg';
import {Promotion} from '../../../../types/types';
import {theme} from '../../../../styles/theme';

interface Props extends AnimateProps<ViewProps> {
  style?: StyleProp<ViewStyle>;
  index: number;
  data: Promotion;
  onPress: (data: Promotion) => void;
}

const Item = (props: Props) => {
  const {...animatedViewProps} = props;

  const originalWidth = 304.16882;
  const originalHeight = 48.379974;
  const aspectRatio = originalWidth / originalHeight;
  const windowWidth = Dimensions.get('window').width;

  const cleanText = (title: string) => {
    let newStr = title.replace(/<\/?[^>]+(>|$)/g, '');
    return decode(newStr);
  };

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

  // Gesture-Handler: on iOS we use TouchableWithoutFeedback because of the bug
  const PressComponent =
    Platform.OS === 'ios' ? TouchableWithoutFeedback : Pressable;

  return (
    <Animated.View
      style={[styles.container, animatedStyle]}
      {...animatedViewProps}>
      <PressComponent
        containerStyle={{flex: 1}}
        style={{flex: 1}}
        onPress={() => props.onPress(props.data)}
        onPressIn={onPressIn}
        onPressOut={onPressOut}>
        {/* Bottom Layer */}
        <View
          style={{
            width: windowWidth,
            aspectRatio,
            position: 'absolute',
            bottom: -24,
            zIndex: 1,
          }}>
          <BackLayer
            fill={props.data.PromotionCardColor}
            width="100%"
            height="100%"
            viewBox={`0 0 ${originalWidth} ${originalHeight}`}
          />
        </View>

        {/* Container */}
        <View style={styles.containerMain}>
          {/* Image Container */}
          <View style={styles.containerImage}>
            {/* Image */}
            <View style={styles.containerImageMask}>
              <FastImage
                source={{
                  uri: props.data.ImageUrl,
                  priority: FastImage.priority.normal,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'purple',
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            {/* Logo Container */}
            <FastImage
              source={{
                uri: props.data.BrandIconUrl,
                priority: FastImage.priority.normal,
              }}
              style={styles.containerLogo}
              resizeMode={FastImage.resizeMode.contain}
            />

            {/* Remaining Text */}
            <View style={styles.containerRemainingText}>
              <Text style={styles.textRemaining}>
                {props.data.RemainingText}
              </Text>
            </View>
          </View>

          {/* Title Container */}
          <View
            style={[
              styles.containerTitle,
              {paddingVertical: Dimensions.get('screen').height / 20},
            ]}>
            <Text style={styles.textTitle}>{cleanText(props.data.Title)}</Text>
          </View>

          {/* Button Container */}
          <TouchableOpacity style={styles.containerButton}>
            <Text
              style={[
                styles.textButton,
                {color: props.data.PromotionCardColor},
              ]}>
              Daha Daha
            </Text>
          </TouchableOpacity>
        </View>
      </PressComponent>
    </Animated.View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerMain: {
    flex: 1,
    borderColor: theme.colors.border,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: 'white',
    zIndex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
  },

  containerImage: {
    flexGrow: 1,
    width: '100%',
    margin: 2,
  },

  containerImageMask: {
    flex: 1,
    borderRadius: 20,
    borderBottomLeftRadius: 150,
    overflow: 'hidden',
  },

  containerLogo: {
    width: 72,
    height: 72,
    borderRadius: 100,
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 10,
    left: 10,
  },

  containerRemainingText: {
    backgroundColor: theme.colors.dark,
    borderRadius: 100,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },

  textRemaining: {
    fontFamily: theme.font.primary,
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: -0.47,
    textTransform: 'lowercase',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: 'white',
  },

  containerTitle: {
    zIndex: 2,
    minHeight: 80,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  textTitle: {
    fontFamily: theme.font.primary,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    textAlign: 'center',
    color: theme.colors.dark,
  },

  containerButton: {
    zIndex: 2,
  },

  textButton: {
    fontFamily: theme.font.primary,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 20,
  },
});
