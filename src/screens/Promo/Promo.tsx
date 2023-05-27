import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import {decode} from 'html-entities';
import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import BackButton from '../../components/Header/BackButton';
import Button from './components/Button';
import {theme} from '../../styles/theme';
import {Detail} from '../../types/types';

type Props = {
  navigation: any;
  route: any;
};

const Promo = (props: Props) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Boolean>(false);
  const [detail, setDetail] = React.useState<Detail>({} as Detail);
  const [aspectRatio, setAspectRatio] = React.useState<number>(1);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getData(props.route.params.id);
  }, []);

  const getData = async (id: number) => {
    try {
      let response = await fetch(
        `https://api.extrazone.com/promotions?Id=${id}`,
        {
          method: 'GET',
          headers: {
            'X-Country-Id': 'TR',
            'X-Language-Id': 'TR',
          },
        },
      );
      let json = await response.json();
      // Clean HTML Tags
      json.Description = decode(cleanText(json.Description));
      json.Title = decode(cleanText(json.Title));
      // Calculate Aspect Ratio
      Image.getSize(json.ImageUrl, (width, height) => {
        setAspectRatio(width / height);
        setDetail(json);
        setLoading(false);
      });
    } catch {
      setError(true);
    }
  };

  const cleanText = (title: string) => {
    if (title === undefined) {
      return '';
    }
    return title.replace(/<\/?[^>]+(>|$)/g, '');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.containerBack, {top: 15 + insets.top}]}>
        <BackButton onPress={() => props.navigation.goBack()} />
      </View>

      {error ? (
        <View style={styles.containerError}>
          <Text>Something went wrong</Text>
        </View>
      ) : loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <View style={[styles.containerButton]}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.1)', '#FFFFFF']}
              style={{flex: 1, justifyContent: 'flex-end'}}>
              <Animatable.View
                animation="fadeInUp"
                duration={500}
                useNativeDriver>
                <Button
                  style={{
                    marginHorizontal: 15,
                    marginBottom: insets.bottom > 0 ? 30 : 15,
                  }}
                  title={decode(
                    cleanText(detail.BrandPromotionCardParticipationText),
                  )}
                />
              </Animatable.View>
            </LinearGradient>
          </View>

          <ScrollView
            style={styles.container}
            contentContainerStyle={{
              paddingBottom: 100,
            }}>
            {/* Image Container */}
            <View style={{aspectRatio: aspectRatio}}>
              {/* Image */}
              <View style={styles.containerImageMask}>
                <FastImage
                  source={{
                    uri: detail.ImageUrl,
                    priority: FastImage.priority.normal,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
              {/* Logo Container */}
              <FastImage
                source={{
                  uri: detail.BrandIconUrl,
                  priority: FastImage.priority.normal,
                }}
                style={styles.containerLogo}
                resizeMode={FastImage.resizeMode.contain}
              />

              {/* Remaining Text */}
              <View style={styles.containerRemainingText}>
                <Text style={styles.textRemaining}>{detail.RemainingText}</Text>
              </View>
            </View>

            <Text style={styles.textTitle}>{detail.Title}</Text>
            <Text style={styles.textDesc}>{detail.Description}</Text>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default Promo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerError: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerBack: {
    position: 'absolute',
    left: 15,
    zIndex: 10,
  },

  containerButton: {
    position: 'absolute',
    height: 130,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },

  containerImageMask: {
    flex: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 120,
    overflow: 'hidden',
  },

  containerLogo: {
    width: 72,
    height: 72,
    borderRadius: 100,
    position: 'absolute',
    backgroundColor: 'white',
    bottom: -15,
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
    color: theme.colors.light,
  },

  textTitle: {
    fontFamily: theme.font.primary,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.2,
    color: theme.colors.dark,
    paddingHorizontal: 15,
    paddingTop: 30,
  },

  textDesc: {
    fontFamily: theme.font.primary,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: theme.colors.dark,
    padding: 15,
  },
});
