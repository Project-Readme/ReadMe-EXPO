import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';
import { Animated, Dimensions, View } from 'react-native';
import styles from '../styles';


const FadeAnimation = props => {
    const [fadeAnim] = useState(new Animated.Value(1));
    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 0,
                duration: 3000,
            }
        ).start()
    }, [])

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
            }}
        >
            {props.children}
        </Animated.View>
    );
}

export default FadeAnimation;

