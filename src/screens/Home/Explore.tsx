import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import ExploreSvg from '../../assets/icons/explore.svg';

type Props = {
  navigation: any;
};

const Home = (props: Props) => {
  const goPage = () => {
    props.navigation.navigate('Promo');
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Pressable onPress={goPage}>
        <Text style={{fontSize: 50}}>Promo</Text>
        <ExploreSvg />
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
