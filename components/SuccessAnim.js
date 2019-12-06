import React from 'react';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';
import { Animated, Dimensions, View, Text } from 'react-native';
import styles from '../styles';


class Success extends React.Component {

  componentDidMount() {
    this.animation.play();
    this._Visibility = new Animated.Value(1);
  }

  render() {

    return (
      <View style={styles.animation}>
        <LottieView
          source={require('../assets/added.json')}
          style={{
            width: 50,
            height: 50,
          }}
          loop={false}
          ref={animation => {
            this.animation = animation;
          }}
        />
        <Text key="add" style={styles.statusText}>Successfully added!</Text>
      </View>
    );
  }
}

export default Success;

