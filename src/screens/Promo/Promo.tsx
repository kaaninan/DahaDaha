import {
  Dimensions,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {decode} from 'html-entities';
import LinearGradient from 'react-native-linear-gradient';

import BackButton from '../../components/Header/BackButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Button from './components/Button';

type Props = {
  navigation: any;
  route: any;
};

type Detail = {
  BrandIconColor: string;
  BrandIconUrl: string;
  BrandPromotionCardParticipationText: string;
  Description: string;
  EndDate: Date;
  Id: number;
  ImageUrl: string;
  CountryTimeZone: number;
  RemainingText: string;
  StartDate: Date;
  Title: string;
  Type: string;
  ScenarioType: string;
  SeoName: string;
  Unavailable: boolean;
  IsMapAvailable: boolean;
  Unvisible: boolean;
  DetailButtonText: string;
  ListButtonText: null;
  PromotionDetailItemAreas: any[];
  NextFlowConfigurations: object;
};

const Promo = (props: Props) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [detail, setDetail] = React.useState<Detail>({} as Detail);

  useEffect(() => {
    getInfo(props.route.params.id);
  }, []);

  // get useSafeAreaInsets().top
  const insets = useSafeAreaInsets();

  const getInfo = async (id: number) => {
    console.log(id);
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
    json.Description = decode(cleanText(json.Description));
    json.Title = decode(cleanText(json.Title));
    setDetail(json);
    setLoading(false);
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

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <View style={[styles.containerButton]}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.1)', '#FFFFFF']}
              style={{flex: 1, justifyContent: 'flex-end'}}>
              <Button
                style={{
                  marginHorizontal: 15,
                  marginBottom: insets.bottom > 0 ? 30 : 15,
                }}
                title={decode(
                  cleanText(detail.BrandPromotionCardParticipationText),
                )}
              />
            </LinearGradient>
          </View>

          <ScrollView
            style={styles.container}
            contentContainerStyle={{
              paddingBottom: 50,
            }}>
            {/* Image Container */}
            <View style={styles.containerImage}>
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
                  resizeMode={FastImage.resizeMode.cover}
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

  containerImage: {
    // flex: 1,
    // width: '100%',
    height: Dimensions.get('window').height / 2,
    // backgroundColor: 'green',
  },

  containerImageMask: {
    flex: 1,
    // height: 200,
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
    backgroundColor: '#1D1E1C',
    borderRadius: 100,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },

  textRemaining: {
    fontFamily: 'Helvetica',
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: -0.47,
    textTransform: 'lowercase',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: 'white',
  },

  textTitle: {
    fontFamily: 'Helvetica',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.2,
    color: '#1D1E1C',
    paddingHorizontal: 15,
    paddingTop: 30,
  },

  textDesc: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: '#1D1E1C',
    padding: 15,
  },
});
