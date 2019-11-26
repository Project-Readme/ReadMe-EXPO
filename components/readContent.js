import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from '../styles';
import dummyData from '../database';

export default class ReadContent extends React.Component {
  constructor() {
    //console.log(dummyData);
    //let { text, title } = dummyData;
    super();
    this.state = {
      title: '',
      text: '',
    };
  }
  render() {
    return (
      <View style={styles.readingContainer}>
        <ScrollView>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{this.state.title}</Text>
          </View>
          <View style={styles.text}>
            <Text>{this.state.text}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
