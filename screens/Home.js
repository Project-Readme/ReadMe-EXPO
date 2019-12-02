import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import TopBar from '../components/topBar';
import styles from '../styles';
import { connect } from 'react-redux';
import { setCurrentContent } from '../store/currentContent';

import Card from '../components/card';
import { FlatList } from 'react-native-gesture-handler';
import ArticleCard from '../components/articleCard';

const dummy = [
  {
    title: 'How to Build a Simple Chrome Extension in Vanilla JavaScript',
    img: {
      uri: 'https://miro.medium.com/max/2957/1*HwO6wiOHiJrN1_jePQrmEA.jpeg',
    },
  },
  {
    title: 'How to Perform Web-Scraping using Node.js',
    img: {
      uri: 'https://miro.medium.com/max/4592/1*tBBX7RGFkadc_yiShZLDCQ.jpeg',
    },
  },
  {
    title: 'You Don’t Understand Bitcoin Because You Think Money Is Real',
    img: {
      uri: 'https://miro.medium.com/max/3887/1*1DQEeByasuoteYxoySd5SA.jpeg',
    },
  },
  {
    title: 'The Real Cost of Phone Addiction',
    img: {
      uri: 'https://miro.medium.com/max/2400/1*wMjnTSs_-znQ2NRUjysK4w.png',
    },
  },
];
const Home = props => {
  const { navigate } = props.navigation;
  return (
    <View style={styles.homeContainer}>
      <TopBar />
      <Text
        style={{
          color: '#747882',
          padding: 10,
          paddingBottom: 0,
          fontSize: 24,
          fontWeight: 'bold',
        }}
      >
        Most Popular
      </Text>
      <ScrollView
        horizontal={true}
        style={{ paddingBottom: 20 }}
        showsHorizontalScrollIndicator={false}
      >
        {props.mostPopularList.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              props.setCurrentContent(item);
              navigate('Article');
            }}
          >
            <Card
              title={item.title}
              image={{
                uri:
                  'https://miro.medium.com/max/2957/1*HwO6wiOHiJrN1_jePQrmEA.jpeg',
              }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text
        style={{
          color: '#747882',
          padding: 10,
          paddingBottom: 0,
          fontSize: 24,
          fontWeight: 'bold',
        }}
      >
        Recommended
      </Text>
      <FlatList
        keyExtractor={article => article.title}
        data={dummy}
        renderItem={article => {
          return (
            <View
              style={{
                borderColor: 'black',
                borderBottomWidth: 1,
                paddingTop: 10,
                paddingBottom: 5,
              }}
            >
              <ArticleCard image={article.item.img} text={article.item.title} />
            </View>
          );
        }}
      />
    </View>
  );
};

Home.navigationOptions = {
  header: null,
};

const mapStateToProps = state => {
  return {
    mostPopularList: state.mostPopularList,
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentContent: article => dispatch(setCurrentContent(article)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
