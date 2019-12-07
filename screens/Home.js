import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, RefreshControl, Animated } from 'react-native';
import TopBar from '../components/topBar';
import styles from '../styles';
import { connect } from 'react-redux';
import { setCurrentContent } from '../store/currentContent';
import { loadMostPopular } from '../store/mostPopularList';
import { loadContentList } from '../store/contentList';
import { checkInternetConnection, offlineActionCreators } from 'react-native-offline';
// import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Entypo } from '@expo/vector-icons'
import db from '../database';

import Card from '../components/Card';
import Swipeable from 'react-native-swipeable-row';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import ArticleCard from '../components/ArticleCard';

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

    // updateRef = ref => {
    //     this._swipeableRow = ref;
    // };

    // close = () => {
    //     this._swipeableRow.close();
    // };

    leftActions = (
        <TouchableOpacity style={styles.swipeableAdd} onPress={() => {
            alert('added')
            // this.addArticle(article.item)
        }}>

            <View>
                <Entypo name="add-to-list" size={36} style={{ paddingTop: '1%' }}></Entypo>
            </View>
        </TouchableOpacity>
    )


    // async addArticle(article) {
    //     const url = article.url.split('/').join('')

    //     try {
    //         const article = await db.collection('articles').doc(url).get()
    //         const data = article.data()
    //         const ref = await db.collection('users').doc(this.props.user).collection('articles').doc(url)
    //         ref.set({
    //             Title: data.Title,
    //             Body: data.Body,
    //             Head: data.Head,
    //             Url: data.URL,
    //             Image: data.Image
    //         })
    //         this.props.loadContentList(this.props.user)
    //     } catch (err) {
    //         console.log('error', err)
    //     }
    // }


    // //=====================================
    // renderLeftActions = (progress, dragX) => {
    //     const scale = dragX.interpolate({
    //         inputRange: [0, 80],
    //         outputRange: [0, 1],
    //         extrapolate: 'clamp',
    //     });
    //     return (
    //         <TouchableOpacity style={styles.swipeableAdd} onPress={() => {
    //             // this.addArticle(article.item)
    //             this.close()
    //         }}>
    //             <View>
    //                 <Entypo name="add-to-list" size={36} style={{ paddingTop: '1%' }}></Entypo>
    //             </View>
    //         </TouchableOpacity>
    //     );
    // }


    render() {
        const { children } = this.props;
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
                                <TouchableOpacity
                                    onPress={
                                        () => {
                                            this.props.setCurrentContent(article.item);
                                            navigate('Article');
                                        }
                                    }
                                >
                                    <View style={styles.recentBox}>
                                        <Swipeable leftContent={<Text>hi</Text>}>
                                            <ArticleCard image={{ uri: article.item.image }} text={article.item.title} />
                                        </Swipeable>
                                    </View>
                                </TouchableOpacity>
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
    connectionChange: (isConnected) => dispatch(offlineActionCreators.connectionChange(isConnected))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
