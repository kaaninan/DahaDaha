import React from 'react';
import {
  StyleProp,
  ViewStyle,
  ViewProps,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import type {AnimateProps} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

import BackLayer from '../../../../assets/path132.svg';
import FastImage from 'react-native-fast-image';

import {Promotion} from '../../Explore';

interface Props extends AnimateProps<ViewProps> {
  style?: StyleProp<ViewStyle>;
  index: number;
  backgroundColor: string;
  data: Promotion;
}

const Item: React.FC<Props> = props => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {style, index, ...animatedViewProps} = props;

  const originalWidth = 304.16882;
  const originalHeight = 48.379974;
  const aspectRatio = originalWidth / originalHeight;
  const windowWidth = Dimensions.get('window').width;

  return (
    <Animated.View style={{flex: 1}} {...animatedViewProps}>
      {/* Bottom Layer */}
      <View
        style={{
          width: windowWidth,
          aspectRatio,
          position: 'absolute',
          bottom: -24,
          zIndex: 1,
          backgroundColor: 'redd',
        }}>
        <BackLayer
          fill={props.backgroundColor}
          width="100%"
          height="100%"
          viewBox={`0 0 ${originalWidth} ${originalHeight}`}
        />
      </View>

      {/* Container */}
      <View style={styles.container}>
        {/* Image Container */}
        <View style={styles.containerImage}>
          <FastImage
            source={{
              uri: props.data.ImageUrl,
              priority: FastImage.priority.normal,
            }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 20,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        {/* Logo Container */}
        <View style={styles.containerLogo}>
          <FastImage
            source={{
              uri: props.data.BrandIconUrl,
              priority: FastImage.priority.normal,
            }}
            style={{
              width: 72,
              height: 72,
              borderRadius: 100,
              position: 'absolute',
              backgroundColor: 'white',
              bottom: 10,
              left: 10,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#F4F6F5',
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: 'white',
    zIndex: 1,
  },

  containerImage: {
    height: '70%',
    borderRadius: 20,
    borderBottomLeftRadius: 150,
    overflow: 'hidden',
    margin: 2,
  },

  containerLogo: {},
});
