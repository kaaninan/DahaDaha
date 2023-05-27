import {
  Dimensions,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Promotion} from '../Home/Explore';
import FastImage from 'react-native-fast-image';
import {decode} from 'html-entities';

import BackLayer from '../../assets/path132.svg';
import BackButton from '../../components/Header/BackButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
  const data: Promotion = props.route.params.data;

  const [detail, setDetail] = React.useState<Detail>({} as Detail);

  const getInfo = async (id: number) => {
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
    // console.log(json.Description);
    setDetail(json);
  };

  const cleanText = (title: string) => {
    let newStr = title.replace(/<\/?[^>]+(>|$)/g, '');

    // Convert special html characters to normal text öçşiğüÖÇŞİĞÜ
    // newStr = newStr.replace(/&ouml;/g, 'ö');
    // newStr = newStr.replace(/&ccedil;/g, 'ç');
    // newStr = newStr.replace(/&thorn;/g, 'ş');
    // newStr = newStr.replace(/&igrave;/g, 'i');
    // newStr = newStr.replace(/&uuml;/g, 'ü');
    // newStr = newStr.replace(/&Ouml;/g, 'Ö');
    // newStr = newStr.replace(/&Ccedil;/g, 'Ç');
    // newStr = newStr.replace(/&THORN;/g, 'Ş');
    // newStr = newStr.replace(/&Igrave;/g, 'İ');
    // newStr = newStr.replace(/&Uuml;/g, 'Ü');
    // newStr = newStr.replace(/&amp;/g, '&');
    // newStr = newStr.replace(/&apos;/g, "'");
    // newStr = newStr.replace(/&quot;/g, '"');
    // newStr = newStr.replace(/&ldquo;/g, '"');
    // newStr = newStr.replace(/&rdquo;/g, '"');
    // newStr = newStr.replace(/&rsquo;/g, "'");
    // newStr = newStr.replace(/&lsquo;/g, "'");
    // newStr = newStr.replace(/&ndash;/g, '-');
    // newStr = newStr.replace(/&mdash;/g, '-');
    // newStr = newStr.replace(/&nbsp;/g, ' ');
    // newStr = newStr.replace(/&hellip;/g, '...');
    // newStr = newStr.replace(/&copy;/g, '©');

    return newStr;
  };

  useEffect(() => {
    getInfo(data.Id);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.containerBack, {top: 15 + useSafeAreaInsets().top}]}>
        <BackButton onPress={() => props.navigation.goBack()} />
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          // paddingTop: useSafeAreaInsets().top,
          paddingBottom: 50,
        }}>
        {/* Image Container */}
        <View style={styles.containerImage}>
          {/* Image */}
          <View style={styles.containerImageMask}>
            <FastImage
              source={{
                uri: data.ImageUrl,
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
              uri: data.BrandIconUrl,
              priority: FastImage.priority.normal,
            }}
            style={styles.containerLogo}
            resizeMode={FastImage.resizeMode.contain}
          />

          {/* Remaining Text */}
          <View style={styles.containerRemainingText}>
            <Text style={styles.textRemaining}>{data.RemainingText}</Text>
          </View>
        </View>

        <Text style={styles.textTitle}>{detail.Title}</Text>
        <Text style={styles.textDesc}>{detail.Description}</Text>
      </ScrollView>
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
