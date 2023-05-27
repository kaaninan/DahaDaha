import * as React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {processColor} from 'react-native-reanimated';
import {interpolateColor} from 'react-native-reanimated';

import Item from './Item';
import {Promotion} from '../../../../types/types';

const PAGE_WIDTH = Dimensions.get('window').width;

type Props = {
  navigation: any;
  data: Promotion[];
};

const Index = (props: Props) => {
  const progressValue = useSharedValue<number>(0);

  const navigate = (data: Promotion) => {
    props.navigation.navigate('Promo', {id: data.Id, seoName: data.SeoName});
  };

  const visibleData = props.data.filter(item => item.Hide === false);

  return (
    <View style={styles.container}>
      <Carousel
        width={PAGE_WIDTH}
        style={{flex: 1}}
        loop={false}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: 70,
        }}
        scrollAnimationDuration={400}
        data={visibleData}
        renderItem={data => {
          return (
            <Item index={data.index} data={data.item} onPress={navigate} />
          );
        }}
      />
      {progressValue && (
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 40,
          }}>
          {visibleData.map((item, index) => {
            return (
              <PaginationItem
                backgroundColor={item.PromotionCardColor}
                animValue={progressValue}
                index={index}
                key={index}
                length={visibleData.length}
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
          marginHorizontal: 3,
        },
      ]}
    />
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: -20,
  },
});
