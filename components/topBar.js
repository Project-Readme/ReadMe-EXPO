import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles';
import Animation from 'lottie-react-native';

export default class TopBar extends React.Component {

  componentDidMount() {
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.topBar}>
        <View>
          <Animation
            ref={ animation => {
                this.animation = animation;
              }}
            style={{
              width: 90,
              height: 90,
            }}
            loop={true}
            source={require('../assets/book.json')}
          />
        </View>
        <Text style={{ marginTop: 10, color: 'white', fontSize: 20 }}>
          ReadMe: Reading on the Go
        </Text>
      </View>
    );
  }
}
