import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Tag from './components/Tag';

type Props = {
  navigation: any;
};

interface TagJSON {
  Id: number;
  Name: string;
  IconUrl: object;
  Rank: number;
}

interface TagState extends TagJSON {
  IsSelected: boolean;
  IconSource: object;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<TagState[]>();

  const getData = async () => {
    let response = await fetch('https://api.extrazone.com/tags/list', {
      method: 'GET',
      headers: {
        'X-Country-Id': 'TR',
        'X-Language-Id': 'TR',
      },
    });
    let json = await response.json();

    // Order by Rank
    json = json.sort((a: TagJSON, b: TagJSON) => a.Rank - b.Rank);
    json = json.map((tag: TagState) => {
      tag.IsSelected = false;
      tag.IconSource = {uri: tag.IconUrl};
      return tag;
    });

    // Add Fırsat Bul
    json.unshift({
      Id: 0,
      Name: 'Fırsat Bul',
      IconSource: require('../../assets/icons/search.png'),
      Rank: 0,
      IsSelected: false,
    });

    setTags(json);
    setLoading(false);
  };

  // OnPress Tag
  const onPressTag = (id: number) => {
    let newTags = tags?.map((tag: TagState) => {
      if (tag.Id === id) {
        tag.IsSelected = !tag.IsSelected;
      } else {
        tag.IsSelected = false;
      }
      return tag;
    });
    setTags(newTags);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />

      {loading ? (
        <View style={styles.containerLoading}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          {/* TAGS */}
          <View>
            <ScrollView
              style={styles.tagScrollContainer}
              contentContainerStyle={{paddingRight: 20}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {tags?.map((tag: TagState) => (
                <Tag
                  key={tag.Id}
                  id={tag.Id}
                  title={tag.Name}
                  source={tag.IconSource}
                  selected={tag.IsSelected}
                  onPress={onPressTag}
                />
              ))}
            </ScrollView>
          </View>

          {/* CAROUSEL */}
          <View style={{flex: 1, backgroundColor: '#888888'}}>
            <Text>Carousel</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tagScrollContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});
