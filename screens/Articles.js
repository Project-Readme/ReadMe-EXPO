import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, Image, TouchableOpacity, Button } from 'react-native';
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
            <View >
                <TopBar />
                <ScrollView>
                { this.props.contentList.map((article, index) => (
                            <TouchableOpacity
                            key={index}
                            onPress={
                                () => {
                                    this.props.setCurrentContent(article);
                                    navigate('Article');
                                }
                            }
                            >
                                <Card
                                    title={article.title}
                                    image={{uri: 'https://miro.medium.com/max/2400/1*wMjnTSs_-znQ2NRUjysK4w.png'}}
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
    contentList: state.contentList
});

const mapDispatchToProps = dispatch => ({
    setCurrentContent: (article) => dispatch(setCurrentContent(article))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllArticles);
