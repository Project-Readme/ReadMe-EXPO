import React from 'react';
import { connect } from 'react-redux';
import {
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    RefreshControl,
    Animated
} from 'react-native';
import TopBar from '../components/topBar';
import Card from '../components/Card';
import { setCurrentContent } from '../store/currentContent';
import { loadContentList } from '../store/contentList'
import styles from '../styles';
import { loadMostPopular } from '../store/mostPopularList';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import db from '../database';
import { checkInternetConnection, offlineActionCreators } from 'react-native-offline';

class AllArticles extends React.Component {
    constructor() {
        super()
        this.state = {
            searched: false,
            searchResults: [],
            isRefreshing: false
        }
        this.onRefresh = this.onRefresh.bind(this)
    }
    static navigationOptions = {
        header: null
    };

    onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout( () => {
            try {
                checkInternetConnection().then(isConnected => {
                    this.props.connectionChange(isConnected);
                    if (isConnected && this.props.user.email) {
                        this.props.loadContentList(this.props.user.email);
                        this.props.loadMostPopular();
                    }
                })
                this.setState({isRefreshing: false});

            } catch (error) {
                console.log(error)
                this.setState({isRefreshing: false});
            }
        });
      }

    searchInputHandler = input => {
        const results = this.props.contentList.filter(article => {
            return article.title.toLowerCase().includes(input.toLowerCase())
        })
        this.setState({ searched: true, searchResults: results })
    }

    rightAction = (progress, dragX, article) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })
        return (
            <TouchableOpacity style={styles.rightAction} onPress={() => this.onSwipeRight(article)}>
                <View >
                    <Animated.Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', padding: 10, transform: [{ scale }] }}>Delete</Animated.Text>
                </View>
            </TouchableOpacity>
        )
    }

    onSwipeRight = async (article) => {
        const url = article.url.split('/').join('')
        try {
            await db.collection('users').doc(this.props.user).collection('articles')
.doc(url)
.delete()
            this.props.loadContentList(this.props.user)
        } catch (err) {
            console.log('error', err)
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.AllArticlesContainer} >
                <TopBar />

                <TextInput
                    placeholder="Search"
                    style={{ ...styles.searchBar, marginTop: 10 }}
                    onChangeText={(i) => {
                        this.searchInputHandler(i)
                    }}
                />

                {this.state.searched ?
                    <ScrollView
                    contentContainerStyle={styles.AllArticles}
                    refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />}
                    >
                        {this.state.searchResults.map((article) => (
                            <TouchableOpacity
                                key={article.id}
                                onPress={
                                    () => {
                                        this.props.setCurrentContent(article);
                                        navigate('Article');
                                    }
                                }
                            >
                                <Card
                                    title={article.title}
                                    image={{ uri: article.image }}
                                />
                            </TouchableOpacity>
                        ))
                        }
                    </ScrollView>
                    : <ScrollView
                    contentContainerStyle={styles.AllArticles}
                    refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />}
                    >
                        {this.props.contentList.map((article) => (
                            <Swipeable
                                key={article.id}
                                renderRightActions={(prog, drag) => this.rightAction(prog, drag, article)}
                            >
                                <TouchableOpacity
                                    onPress={
                                        () => {
                                            this.props.setCurrentContent(article);
                                            navigate('Article');
                                        }
                                    }
                                >
                                    <Card
                                        title={article.title}
                                        image={{ uri: article.image }}
                                    />
                                </TouchableOpacity>
                            </Swipeable>
                        ))
                        }
                      </ScrollView>}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    contentList: state.contentList,
    user: state.user.email
});

const mapDispatchToProps = dispatch => ({
    setCurrentContent: article => dispatch(setCurrentContent(article)),
    loadMostPopular: () => dispatch(loadMostPopular()),
    loadContentList: (email) => dispatch(loadContentList(email)),
    connectionChange: (isConnected) => dispatch(offlineActionCreators.connectionChange(isConnected))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllArticles);
