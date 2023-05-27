import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Tag from './components/Tag/Tag';
import CarouselContainer from './components/Carousel/Container';
import {Buffer} from 'buffer';

const tagsJSON =
  '[{"IconUrl":"https://prod-extrazone-document-bucket.s3.eu-west-1.amazonaws.com/tag/tr/728b466a-4024-48bc-b382-e52900f49915/desktop/728b466a-4024-48bc-b382-e52900f49915.png","Id":3,"Name":"Coca-Cola","Rank":1},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/52082c91-ef54-4792-bd26-fbefa992625b/tr/desktop/52082c91-ef54-4792-bd26-fbefa992625b.png","Id":20,"Name":"Fanta","Rank":2},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/78d3361f-3c73-45bf-880b-6c9c6eb3adab/tr/desktop/78d3361f-3c73-45bf-880b-6c9c6eb3adab.png","Id":23,"Name":"İnternet","Rank":2},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/6e64226d-b93f-4c7d-ac2a-cc05cf2c2b8e/tr/desktop/6e64226d-b93f-4c7d-ac2a-cc05cf2c2b8e.jpeg","Id":45,"Name":"obilet","Rank":3},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/2e7e305a-c465-4ec2-b1d8-a51c262b0f29/tr/desktop/2e7e305a-c465-4ec2-b1d8-a51c262b0f29.jpeg","Id":44,"Name":"Kütahya Porselen","Rank":4},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/360a9c64-9e8f-496a-8240-72d849a9f467/tr/desktop/360a9c64-9e8f-496a-8240-72d849a9f467.jpeg","Id":47,"Name":"Hepsiburada","Rank":4},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/70bf01fd-ced4-44ac-be2d-375593abfb9d/tr/desktop/70bf01fd-ced4-44ac-be2d-375593abfb9d.jpeg","Id":39,"Name":"Fizy","Rank":5},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/0d874a78-31cb-4de1-8580-680706a74b83/tr/desktop/0d874a78-31cb-4de1-8580-680706a74b83.jpeg","Id":49,"Name":"PİDEM","Rank":5},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/a83b3bce-b615-4ed1-bb36-3b657ce30c03/tr/desktop/e988a691-4ab1-4903-adca-184262ebfb13.png","Id":8,"Name":"Exxen","Rank":6},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/28214f21-4eda-48a6-89e6-21a28d88da4e/tr/desktop/42e6e264-1dac-4692-97a0-3db9fa1ed7c7.png","Id":25,"Name":"TikTak","Rank":6},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/68465227-d0c0-4847-af8c-d26c5f1f3c6f/tr/desktop/68465227-d0c0-4847-af8c-d26c5f1f3c6f.png","Id":27,"Name":"Fetih","Rank":6},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/57f3f65b-a892-4957-b0d3-41fe8082795c/tr/desktop/57f3f65b-a892-4957-b0d3-41fe8082795c.jpeg","Id":36,"Name":"Hop","Rank":6},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/5a122411-6677-42bf-b759-c56fbc029a32/tr/desktop/5a122411-6677-42bf-b759-c56fbc029a32.jpeg","Id":46,"Name":"Finish","Rank":6},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/b11d180b-ff62-4518-9a61-caba49ea00ed/tr/desktop/b11d180b-ff62-4518-9a61-caba49ea00ed.png","Id":28,"Name":"Lords Mobile","Rank":7},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/446e7146-0c71-4035-b25e-16c482429b54/tr/desktop/446e7146-0c71-4035-b25e-16c482429b54.png","Id":37,"Name":"D&R","Rank":7},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/240aa1d2-fc91-45c7-859f-46c797465e81/tr/desktop/240aa1d2-fc91-45c7-859f-46c797465e81.png","Id":10,"Name":"Tavla Stars","Rank":8},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/5bdf289a-0105-420e-949a-cb512ddf7c6c/tr/desktop/5bdf289a-0105-420e-949a-cb512ddf7c6c.png","Id":35,"Name":"Sprite","Rank":10},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/17405c02-4dc1-4c16-b6be-104c5ea5a63a/tr/desktop/17405c02-4dc1-4c16-b6be-104c5ea5a63a.jpeg","Id":38,"Name":"Pegasus","Rank":10},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/2d7e264c-557f-4f7f-b8c4-4340b62650c6/tr/desktop/2d7e264c-557f-4f7f-b8c4-4340b62650c6.jpeg","Id":41,"Name":"Braun","Rank":10},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/10bfae70-970d-4b82-b474-385e4c645098/tr/desktop/10bfae70-970d-4b82-b474-385e4c645098.jpeg","Id":17,"Name":"FILMBOX+","Rank":11},{"IconUrl":"https://prod-extrazone-document-bucket.s3-eu-west-1.amazonaws.com/tag/tr/20f06a24-e648-45c5-9dc5-a6c79c6fcbe5/tr/desktop/20f06a24-e648-45c5-9dc5-a6c79c6fcbe5.jpeg","Id":43,"Name":"Armut","Rank":20}]';

const promotionsJSON =
  'W3siQnJhbmRJY29uQ29sb3IiOiIjRkZGRkZGIiwiQnJhbmRJY29uVXJsIjoiaHR0cHM6Ly9wcm9kLWV4dHJhem9uZS1kb2N1bWVudC1idWNrZXQuczMtZXUtd2VzdC0xLmFtYXpvbmF3cy5jb20vYnJhbmQvdHIvOTUxNTllZTgtMDQ4Yy00ZTMzLTgxNDgtYTNkMWUyMGJiZTc0L3RyL2Rlc2t0b3AvOTUxNTllZTgtMDQ4Yy00ZTMzLTgxNDgtYTNkMWUyMGJiZTc0LnBuZyIsIkJyYW5kUHJvbW90aW9uQ2FyZFBhcnRpY2lwYXRpb25UZXh0IjoiPHA+PHNwYW4gc3R5bGU9XCJjb2xvcjogIzAwMDAwMDtcIj4uPC9zcGFuPjwvcD4iLCJJZCI6MzMsIkltYWdlVXJsIjoiaHR0cHM6Ly9wcm9kLWV4dHJhem9uZS1kb2N1bWVudC1idWNrZXQuczMtZXUtd2VzdC0xLmFtYXpvbmF3cy5jb20vcHJvbW90aW9uL3RyL2EwMjc0MTk1LWE1NTYtNDNlMi05ZTk2LThmZjBkYjcwZjQyNC90ci9kZXNrdG9wLzU1NWMxMjRlLTExMzQtNDk2NC1iYWI3LTAyZTBiOGM5MWNmZi5qcGVnIiwiUHJvbW90aW9uQ2FyZENvbG9yIjoiI0Y2QkUwMCIsIlJlbWFpbmluZ1RleHQiOiJTb24gNCBnw7xuIiwiU2VvTmFtZSI6ImxveWFsdHktMjAyMiIsIlRpdGxlIjoiPHAgY2xhc3M9XCJwMVwiPjxzcGFuIHN0eWxlPVwiY29sb3I6ICNlMDNlMmQ7XCI+LTwvc3Bhbj48L3A+IiwiU2NlbmFyaW9UeXBlIjoiRGFoYVBvaW50IiwiVW5hdmFpbGFibGUiOmZhbHNlLCJVbnZpc2libGUiOmZhbHNlLCJMaXN0QnV0dG9uVGV4dCI6IjxwPjxzcGFuIHN0eWxlPVwiY29sb3I6ICMwMDAwMDA7XCI+Ljwvc3Bhbj48L3A+In0seyJCcmFuZEljb25Db2xvciI6IiNGRkZGRkYiLCJCcmFuZEljb25VcmwiOiJodHRwczovL3Byb2QtZXh0cmF6b25lLWRvY3VtZW50LWJ1Y2tldC5zMy1ldS13ZXN0LTEuYW1hem9uYXdzLmNvbS9icmFuZC90ci9jY2ZiZDIzNS0zODIwLTQxMjAtYTM1MS01YWYxZTM3MWIyNDIvdHIvZGVza3RvcC9jY2ZiZDIzNS0zODIwLTQxMjAtYTM1MS01YWYxZTM3MWIyNDIucG5nIiwiQnJhbmRQcm9tb3Rpb25DYXJkUGFydGljaXBhdGlvblRleHQiOiI8cD48c3BhbiBzdHlsZT1cImNvbG9yOiAjRkY4MjAwO1wiPkhlbWVuIEthdMSxbDwvc3Bhbj48L3A+IiwiSWQiOjc1LCJJbWFnZVVybCI6Imh0dHBzOi8vcHJvZC1leHRyYXpvbmUtZG9jdW1lbnQtYnVja2V0LnMzLWV1LXdlc3QtMS5hbWF6b25hd3MuY29tL3Byb21vdGlvbi90ci8xMDU0NDdlMS1kMTM5LTRiNjQtYTgwYi05OTc5NTUxZWNmMTIvdHIvZGVza3RvcC8xMDU0NDdlMS1kMTM5LTRiNjQtYTgwYi05OTc5NTUxZWNmMTIucG5nIiwiUHJvbW90aW9uQ2FyZENvbG9yIjoiI0ZGODIwMCIsIlJlbWFpbmluZ1RleHQiOiIzMC4wOS4yMDIzIiwiU2VvTmFtZSI6ImZhbnRhLWZlc3QtMjAyMyIsIlRpdGxlIjoiPHAgY2xhc3M9XCJwMVwiPlRvcGxhLCBGYW50YSBGZXN0IGJpbGV0aSB2ZXlhIG1pbHlvbmxhcmNhIGhlZGl5ZSBrYXphbjwvcD4iLCJTY2VuYXJpb1R5cGUiOiJEZWZhdWx0IiwiVW5hdmFpbGFibGUiOmZhbHNlLCJVbnZpc2libGUiOmZhbHNlLCJMaXN0QnV0dG9uVGV4dCI6IjxwPjxzcGFuIHN0eWxlPVwiY29sb3I6ICNlMDNlMmQ7XCI+SGVtZW4gS2F0xLFsPC9zcGFuPjwvcD4ifSx7IkJyYW5kSWNvbkNvbG9yIjoiI0ZGRkZGRiIsIkJyYW5kSWNvblVybCI6Imh0dHBzOi8vcHJvZC1leHRyYXpvbmUtZG9jdW1lbnQtYnVja2V0LnMzLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tL2JyYW5kL3RyLzI5MzhhMWJiLTUxODgtNDQxNS05Yzg1LThmNzIxNGY2MDc2MC9kZXNrdG9wLzI5MzhhMWJiLTUxODgtNDQxNS05Yzg1LThmNzIxNGY2MDc2MC5wbmciLCJCcmFuZFByb21vdGlvbkNhcmRQYXJ0aWNpcGF0aW9uVGV4dCI6IjxwPjxzcGFuIHN0eWxlPVwiY29sb3I6ICNmZjAwMDA7XCI+SGVtZW4gS2F0xLFsPC9zcGFuPjwvcD4iLCJJZCI6NzIsIkltYWdlVXJsIjoiaHR0cHM6Ly9wcm9kLWV4dHJhem9uZS1kb2N1bWVudC1idWNrZXQuczMtZXUtd2VzdC0xLmFtYXpvbmF3cy5jb20vcHJvbW90aW9uL3RyLzcyOTYwNjIxLWMzYTItNDRmYS1iYWM2LTVjMzQyODYwOTJiZi90ci9kZXNrdG9wLzJlMjdiYWY2LTAyZGItNDViZC1iYjVjLWNmMTNiZGM1NGY0Zi5qcGVnIiwiUHJvbW90aW9uQ2FyZENvbG9yIjoiI0Y0MDAwMCIsIlJlbWFpbmluZ1RleHQiOiIzMS4wNy4yMDIzIiwiU2VvTmFtZSI6Imt1dGFoeWEtcG9yc2VsZW4tcHJvbW8tMjAyMyIsIlRpdGxlIjoiPHA+SGVyIGthcGFrdGEgMjVUTCBkZcSfZXJpbmRlIEsmdXVtbDt0YWh5YSDEsG5kaXJpbSBLb2R1ITwvcD4iLCJTY2VuYXJpb1R5cGUiOiJEZWZhdWx0IiwiVW5hdmFpbGFibGUiOmZhbHNlLCJVbnZpc2libGUiOmZhbHNlLCJMaXN0QnV0dG9uVGV4dCI6IjxwPjxzcGFuIHN0eWxlPVwiY29sb3I6ICNlMDNlMmQ7XCI+SGVtZW4gS2F0xLFsPC9zcGFuPjwvcD4ifSx7IkJyYW5kSWNvbkNvbG9yIjoiI0ZGRkZGRiIsIkJyYW5kSWNvblVybCI6Imh0dHBzOi8vcHJvZC1leHRyYXpvbmUtZG9jdW1lbnQtYnVja2V0LnMzLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tL2JyYW5kL3RyLzI5MzhhMWJiLTUxODgtNDQxNS05Yzg1LThmNzIxNGY2MDc2MC9kZXNrdG9wLzI5MzhhMWJiLTUxODgtNDQxNS05Yzg1LThmNzIxNGY2MDc2MC5wbmciLCJCcmFuZFByb21vdGlvbkNhcmRQYXJ0aWNpcGF0aW9uVGV4dCI6IjxwPjxzcGFuIHN0eWxlPVwiY29sb3I6ICNmZjAwMDA7XCI+SGVtZW4gS2F0xLFsPC9zcGFuPjwvcD4iLCJJZCI6NzAsIkltYWdlVXJsIjoiaHR0cHM6Ly9wcm9kLWV4dHJhem9uZS1kb2N1bWVudC1idWNrZXQuczMtZXUtd2VzdC0xLmFtYXpvbmF3cy5jb20vcHJvbW90aW9uL3RyLzE4NDIxODc5LTljNDMtNDNiNy1iZDM2LTdmYmQzYTZjNTllNC90ci9kZXNrdG9wL2VhOTE0MzQ2LTk0ZGEtNDcwOC04M2IxLTE1Y2RjMTE0MDhhZC5wbmciLCJQcm9tb3Rpb25DYXJkQ29sb3IiOiIjRjQwMDAwIiwiUmVtYWluaW5nVGV4dCI6IjI0LjA3LjIwMjMiLCJTZW9OYW1lIjoiZ3Vlc3MtdGhlLWZsYXZvci1wcm9tby0yMDIzIiwiVGl0bGUiOiI8cD5HaXpsaSBUYXRsYXLEsSBUYWhtaW4gRXQhPC9wPiIsIlNjZW5hcmlvVHlwZSI6IkRlZmF1bHQiLCJVbmF2YWlsYWJsZSI6ZmFsc2UsIlVudmlzaWJsZSI6ZmFsc2UsIkxpc3RCdXR0b25UZXh0IjoiPHA+PHNwYW4gc3R5bGU9XCJjb2xvcjogI2UwM2UyZDtcIj5IZW1lbiBLYXTEsWw8L3NwYW4+PC9wPiJ9XQ==';

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

export interface Promotion {
  BrandIconColor: string;
  BrandIconUrl: string;
  BrandPromotionCardParticipationText: string;
  Id: number;
  ImageUrl: string;
  PromotionCardColor: string;
  RemainingText: string;
  SeoName: string;
  Title: string;
  ScenarioType: string;
  Unavailable: boolean;
  Unvisible: boolean;
  ListButtonText: string;
  Hide: boolean;
}

const Home = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<TagState[]>();
  const [promotions, setPromotions] = useState<Promotion[]>([] as Promotion[]);
  const [keyCarosuel, setKeyCarosuel] = useState<number>(0);

  const getData = async () => {
    try {
      await getTags();
    } catch (error) {
      console.log('getTags', error);
    }
    try {
      await getPromotions();
    } catch (error) {
      console.log('getPromotions', error);
    }
    setLoading(false);
  };

  const getTags = async () => {
    // let response = await fetch('https://api.extrazone.com/tags/list', {
    //   method: 'GET',
    //   headers: {
    //     'X-Country-Id': 'TR',
    //     'X-Language-Id': 'TR',
    //   },
    // });
    // let json = await response.json();
    let json = JSON.parse(tagsJSON);

    // Order by Rank
    json = json.sort((a: TagJSON, b: TagJSON) => a.Rank - b.Rank);
    json = json.map((tag: TagState) => {
      tag.IsSelectable = true;
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
      IsSelectable: false,
    });

    setTags(json);
  };

  const getPromotions = async () => {
    // let response = await fetch(
    //   'https://api.extrazone.com/promotions/list?Channel=PWA',
    //   {
    //     method: 'GET',
    //     headers: {
    //       'X-Country-Id': 'TR',
    //       'X-Language-Id': 'TR',
    //     },
    //   },
    // );
    // let json = await response.json();

    // json = JSON.stringify(json);
    // // Base64 Decode
    // json = Buffer.from(json, 'utf-8').toString('base64');
    // // json = JSON.parse(json);

    let rev = Buffer.from(promotionsJSON, 'base64').toString('utf-8');
    let jsonRev = JSON.parse(rev);
    jsonRev.map((promotion: Promotion) => {
      promotion.Hide = false;
    });
    setPromotions(jsonRev);
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

      setKeyCarosuel(keyCarosuel + 1);
    } else {
      promotions.map((promotion: Promotion) => {
        promotion.Hide = false;
      });
      setKeyCarosuel(keyCarosuel + 1);
    }
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
          <View style={{zIndex: 2}}>
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
          </View>

          {/* CAROUSEL */}
          <CarouselContainer
            key={keyCarosuel}
            data={promotions}
            navigation={props.navigation}
          />
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
