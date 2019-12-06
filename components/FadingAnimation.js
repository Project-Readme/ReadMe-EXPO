import React, { useState } from 'react';
import { Animated } from 'react-native';

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

