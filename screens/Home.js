import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import TopBar from '../components/topBar';
import styles from '../styles';
import { connect } from 'react-redux';
import { setCurrentContent } from '../store/currentContent';

import Card from '../components/Card';
import { FlatList } from 'react-native-gesture-handler';
import ArticleCard from '../components/ArticleCard';

const Home = props => {
    const { navigate } = props.navigation;
    return (
        <View style={styles.homeContainer}>
            <TopBar />
            <Text style={{ color: '#747882', padding: 10, paddingBottom: 0, fontSize: 24, fontWeight: 'bold' }}>Most Popular</Text>
            <ScrollView
                horizontal={true}
                style={{ paddingBottom: 20 }}
                showsHorizontalScrollIndicator={false}
            >
                {props.mostPopularList.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={
                            () => {
                                props.setCurrentContent(item);
                                navigate('Article');
                            }
                        }
                    >
                        <Card
                            title={item.title}
                            image={{ uri: item.image }}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Text style={{ color: '#747882', padding: 10, paddingBottom: 0, fontSize: 24, fontWeight: 'bold' }}>Recent Articles</Text>
        </View>
    )
}

Home.navigationOptions = {
    header: null,
};

const mapStateToProps = state => {
    return {
        mostPopularList: state.mostPopularList
    }
};

const mapDispatchToProps = dispatch => ({
    setCurrentContent: (article) => dispatch(setCurrentContent(article))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
