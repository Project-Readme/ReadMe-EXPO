import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

import styles from '../styles';
import db from '../database';

export default class ReadContent extends React.Component {
  constructor() {
    super();
    this.state = {
      article: '<html><h2>hi there</h2></html>'
    };
  }

  componentDidMount() {
      this.loadData();
  }

  async loadData() {

//     let test = db.collection('content').doc('newArticle');
// let newArticle = test
//   .get()
//   .then(doc => {
//     if (!doc.exists) {
//       console.log('No such document!');
//     } else {
//       // console.log('Document data:', doc.data());
//       console.log('working')
//     }
//   })
//   .catch(err => {
//     console.log('Error getting document', err);
//   });
// // console.log(newArticle);

    let articles = await db.collection('content').get();

    console.log("we have", articles.docs.length, "articles in the database");
    // console.log("the first is:", articles.docs[0]);
    // console.log("the second is:", articles.docs[1]);
    articles.docs.forEach(async doc => console.log(await doc._object.proto.fields));

    // this.setState({article: articles.})

    try {
      
    } catch (error) {
      console.error(error);
    }

  }

  render() {
    return (
      <View style={styles.readingContainer}>
        <ScrollView>
          <WebView source={{html: this.state.article}} />
        </ScrollView>
      </View>
    );
  }
}
