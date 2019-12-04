import React from 'react';
import { connect } from 'react-redux';
import {
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    RefreshControl
} from 'react-native';
import TopBar from '../components/topBar';
import Card from '../components/Card';
import { setCurrentContent } from '../store/currentContent';
import styles from '../styles';
import { loadContentList } from '../store/contentList';
import { loadMostPopular } from '../store/mostPopularList';

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
                this.props.loadContentList(this.props.user);
                this.props.loadMostPopular();
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
    loadContentList: (user) => dispatch(loadContentList(user)),
    loadMostPopular: () => dispatch(loadMostPopular()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllArticles);
