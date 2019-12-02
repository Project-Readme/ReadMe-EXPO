import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Button,
} from 'react-native';
import TopBar from '../components/topBar';
import Card from '../components/Card';
import { setCurrentContent } from '../store/currentContent';
import styles from '../styles';

class AllArticles extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.AllArticlesContainer} >
                <TopBar />
                <ScrollView contentContainerStyle={styles.AllArticles}>
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
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    contentList: state.contentList,
});

const mapDispatchToProps = dispatch => ({
    setCurrentContent: article => dispatch(setCurrentContent(article)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllArticles);
