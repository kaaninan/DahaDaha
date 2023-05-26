import * as React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import Item from './Item';
import {processColor} from 'react-native-reanimated';
import {interpolateColor} from 'react-native-reanimated';
import {Promotion} from '../../Explore';

const PAGE_WIDTH = Dimensions.get('window').width;

interface Props {
  data: Promotion[];
}

const Index = (props: Props) => {
  const progressValue = useSharedValue<number>(0);

  return (
    <View style={styles.container}>
      <Carousel
        width={PAGE_WIDTH}
        style={{flex: 1, marginBottom: 40}}
        loop={false}
        pagingEnabled={true}
        snapEnabled={true}
        autoPlay={false}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.89,
          parallaxScrollingOffset: 50,
        }}
        data={props.data}
        renderItem={data => {
          return (
            <Item
              index={data.index}
              backgroundColor={data.item.PromotionCardColor}
              data={data.item}
            />
          );
        }}
      />
      {progressValue && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 40,
            alignSelf: 'center',
          }}>
          {props.data.map((item, index) => {
            return (
              <PaginationItem
                backgroundColor={item.PromotionCardColor}
                animValue={progressValue}
                index={index}
                key={index}
                length={props.data.length}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

const PaginationItem: React.FC<{
  index: number;
  backgroundColor: string;
  length: number;
  animValue: Animated.SharedValue<number>;
}> = props => {
  const {animValue, index, backgroundColor} = props;
  const width = 10;

  // Dots will be used for pagination
  // For every page we will have a dot that width is 10
  // For active page we will have a dot that width is 20
  // When page is changing we will animate the width of the dot
  // We will use interpolate function to animate the width of the dot
  // For first page animValue will be 0 and 0.5
  // For second page animValue will be 0.5 and 1.5
  // For third page animValue will be 1.5 and 2.5
  // For fourth page animValue will be 2.5 and 3.5
  // For fifth page animValue will be 3.5 and 4.5

  // For backgroundColor
  // If item is Selected we will use backgroundColor
  // If item is not Selected we will use #D8D8D8
  // BackgroundColor also will be animated

  const animStyle = useAnimatedStyle(() => {
    const widthVal = interpolate(
      animValue.value,
      [(index - 1) * 1, index * 1, (index + 1) * 1],
      [10, 20, 10],
      Extrapolate.CLAMP,
    );

    const backgroundColorVal = interpolateColor(
      animValue.value,
      [(index - 1) * 1, index * 1, (index + 1) * 1],
      [
        processColor('#D8D8D8'),
        processColor(backgroundColor),
        processColor('#D8D8D8'),
      ],
    );

    return {
      width: widthVal,
      backgroundColor: backgroundColorVal,
    };
  });

  return (
    <Animated.View
      style={[
        animStyle,
        {
          backgroundColor: backgroundColor,
          height: width,
          borderRadius: 50,
          overflow: 'hidden',
          marginHorizontal: 2,
        },
      ]}>
      {/* <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      /> */}
    </Animated.View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
