import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

type Props = {
  title: string;
  onPress?: () => void;
};

const Login = (props: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F40000',
    justifyContent: 'center',
  },
  text: {
    paddingHorizontal: 20,
    fontFamily: 'Helvetica',
    fontWeight: '700',
    letterSpacing: -0.17,
    color: '#FFFFFF',
  },
});
