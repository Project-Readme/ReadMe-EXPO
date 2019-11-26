import React from 'react';
import { Text, View } from 'react-native';
import TopBar from '../components/topBar';
import ReadContent from '../components/readContent';

const SingleArticle = props => {
    return (
        <View>
            <TopBar />
            <ReadContent />
        </View>
    )
}

export default SingleArticle;
