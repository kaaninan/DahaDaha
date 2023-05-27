import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import Tag from './components/Tag/Tag';
import CarouselContainer from './components/Carousel/Container';
import {Promotion, TagJSON, TagState} from '../../types/types';

type Props = {
  navigation: any;
};

const Home = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Boolean>(false);
  const [tags, setTags] = useState<TagState[]>();
  const [promotions, setPromotions] = useState<Promotion[]>([] as Promotion[]);
  const [keyCarosuel, setKeyCarosuel] = useState<number>(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await getTags();
      await getPromotions();
    } catch {
      return setError(true);
    }
    setLoading(false);
  };

  const getTags = async () => {
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
      tag.IsSelectable = true;
      tag.IsSelected = false;
      tag.IconSource = {uri: tag.IconUrl};
      return tag;
    });

    // Add `Fırsat Bul`
    json.unshift({
      Id: 0,
      Name: 'Fırsat Bul',
      IconSource: require('../../assets/icons/search.png'),
      Rank: 0,
      IsSelected: false,
      IsSelectable: false,
    });

    setTags(json);
  };

  const getPromotions = async () => {
    let response = await fetch(
      'https://api.extrazone.com/promotions/list?Channel=PWA',
      {
        method: 'GET',
        headers: {
          'X-Country-Id': 'TR',
          'X-Language-Id': 'TR',
        },
      },
    );
    let json = await response.json();
    json.map((promotion: Promotion) => {
      promotion.Hide = false;
    });
    setPromotions(json);
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

    // Filter selected tag
    let selectedTags = newTags?.filter(
      (tag: TagState) => tag.IsSelected === true,
    );

    let selectedTag = null;
    if (selectedTags?.length) {
      selectedTag = selectedTags[0];
    }

    if (selectedTag != null && selectedTag.Id !== 0) {
      let filterText = selectedTag.Name;

      promotions.map((promotion: Promotion) => {
        if (promotion.Title.includes(filterText)) {
          promotion.Hide = false;
        } else if (promotion.SeoName.includes(filterText)) {
          promotion.Hide = false;
        } else {
          promotion.Hide = true;
        }
      });

      // Reset Carousel because of UI bugs
      setKeyCarosuel(keyCarosuel + 1);
    } else {
      promotions.map((promotion: Promotion) => {
        promotion.Hide = false;
      });
      // Reset Carousel because of UI bugs
      setKeyCarosuel(keyCarosuel + 1);
    }
  };

  if (error) {
    return (
      <View style={styles.containerLoading}>
        <Text>Something went wrong</Text>
      </View>
    );
  }

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
          <Animatable.View
            style={{zIndex: 2}}
            animation="fadeIn"
            duration={400}
            useNativeDriver>
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
                  selectable={tag.IsSelectable}
                />
              ))}
            </ScrollView>
          </Animatable.View>

          {/* CAROUSEL */}
          <Animatable.View
            animation="fadeIn"
            duration={400}
            key={keyCarosuel}
            useNativeDriver
            style={{flex: 1}}>
            <CarouselContainer
              data={promotions}
              navigation={props.navigation}
            />
          </Animatable.View>
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
    paddingTop: 20,
    zIndex: 3,
  },
});
