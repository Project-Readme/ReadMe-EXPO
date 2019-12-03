import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Button,
    TextInput
} from 'react-native';
import TopBar from '../components/topBar';
import Card from '../components/Card';
import { setCurrentContent } from '../store/currentContent';
import styles from '../styles';

class AllArticles extends React.Component {
    constructor() {
        super()
        this.state = {
            searched: false,
            searchResults: []
        }
    }
    static navigationOptions = {
        header: null
    };

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
                >
                </TextInput>
                {this.state.searched ?
                    <ScrollView contentContainerStyle={styles.AllArticles}>
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
                    : <ScrollView contentContainerStyle={styles.AllArticles}>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AllArticles);
