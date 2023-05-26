import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';

type Props = {
  navigation: any;
};

const Home = (props: Props) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
