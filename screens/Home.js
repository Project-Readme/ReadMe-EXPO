import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import SwipeableRow from '../components/SwipeableRow';
import TopBar from '../components/topBar';
import styles from '../styles';
import { connect } from 'react-redux';
import { setCurrentContent } from '../store/currentContent';
import { loadMostPopular } from '../store/mostPopularList';
import { loadContentList } from '../store/contentList';

import Card from '../components/Card';
import { FlatList } from 'react-native-gesture-handler';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            isRefreshing: false,
        }
        this.onRefresh = this.onRefresh.bind(this)
    }
    static navigationOptions = {
        header: null
    };

    onRefresh() {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            try {
                this.props.loadContentList(this.props.user.email);
                this.props.loadMostPopular();
                this.setState({ isRefreshing: false });

            } catch (error) {
                console.log(error)
                this.setState({ isRefreshing: false });
            }
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.homeContainer}>
                <TopBar />
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />
                    }
                >
                    <Text style={styles.homeHeader}>Most Popular</Text>
                    <ScrollView
                        horizontal={true}
                        style={{ paddingBottom: 20 }}
                        showsHorizontalScrollIndicator={false}
                    >
                        {this.props.mostPopularList.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={
                                    () => {
                                        this.props.setCurrentContent(item);
                                        navigate('Article');
                                    }}
                            >
                                <Card
                                    title={item.title}
                                    image={{ uri: item.image }}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <Text style={styles.homeHeader}>Recent Articles</Text>
                    <FlatList
                        keyExtractor={article => article.title}
                        data={this.props.mostRecentList}
                        renderItem={article => {
                            return (
                                <SwipeableRow
                                    image={{ uri: article.item.image }}
                                    text={article.item.title}
                                    article={article.item}
                                    navigate={navigate}
                                    type={'recent'}>
                                </SwipeableRow>
                            )
                        }}
                    />
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        mostPopularList: state.mostPopularList,
        mostRecentList: state.mostRecentList,
        user: state.user.email
    }
};

const mapDispatchToProps = dispatch => ({
    setCurrentContent: (article) => dispatch(setCurrentContent(article)),
    loadMostPopular: () => dispatch(loadMostPopular()),
    loadContentList: (user) => dispatch(loadContentList(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
