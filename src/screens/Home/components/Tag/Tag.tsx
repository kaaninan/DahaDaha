import {
  ImageRequireSource,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FastImage, {Source} from 'react-native-fast-image';

type Props = {
  id: number;
  source: Source | ImageRequireSource;
  title: string;
  selected?: boolean;
  onPress: (id: number) => void;
};

const Tag = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.id)}
      style={[
        styles.container,
        {borderColor: props.selected ? '#F40000' : '#ECEEEF'},
      ]}
      activeOpacity={1}>
      <FastImage
        key={props.id}
        style={styles.icon}
        source={props.source}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    height: 36,
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: 8,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: 24,
    height: 24,
    marginLeft: 6,
    borderRadius: 7.2,
  },

  text: {
    fontFamily: 'Helvetica',
    fontWeight: '400',
    fontSize: 12,
    paddingHorizontal: 10,
    color: '#000000',
  },
});
