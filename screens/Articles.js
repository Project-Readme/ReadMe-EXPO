import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, Button } from 'react-native';

import TopBar from '../components/topBar';

export default class AllArticles extends React.Component {
    static navigationOptions = {
        header: null
      };

    constructor(props) {
      super(props);
      this.state = {
          articles: [
            {
            title: 'More Powerful Batteries Make This a True Electric Car Race',
            mainPic:
        'https://media.wired.com/photos/5dd5921332c5e00009b2bf39/master/w_2560%2Cc_limit/Transpo-Eracing-1161932818-2.jpg'
            },
            {
            title: 'TEST',
            mainPic: 'https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg'
            }
        ],
      }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
          <View>
              <TopBar />
             { this.state.articles.map((article, index) => (
                        <TouchableOpacity key={index} >
                            <Image
                                source={{uri: article.mainPic}}
                                style={{width: 100, height: 100}}
                            />
                            <Button
                                title={article.title}
                                onPress={() => navigate('Article')}
                            />
                        </TouchableOpacity>
             ))
              }
          </View>
        );
      }
    }

