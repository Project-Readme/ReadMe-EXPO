import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import TopBar from '../components/topBar';
import styles from '../styles';
import { connect } from 'react-redux';
import { setCurrentContent } from '../store/currentContent';
import { loadContentList } from '../store/contentList';
import { loadMostPopular } from '../store/mostPopularList';
import { checkInternetConnection, offlineActionCreators } from 'react-native-offline';

import Card from '../components/Card';
import { FlatList } from 'react-native-gesture-handler';
import ArticleCard from '../components/ArticleCard';

class Home extends React.Component {
    componentDidMount() {

        checkInternetConnection().then(isConnected => {
            this.props.connectionChange(isConnected);
            if (isConnected && this.props.user) {
                this.props.loadContentList(this.props.user);
                this.props.loadMostPopular();
            }
        })
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.homeContainer}>
                <TopBar />
                <Text style={{ color: '#747882', padding: 10, paddingBottom: 0, fontSize: 24, fontWeight: 'bold' }}>Most Popular</Text>
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
}

Home.navigationOptions = {
  header: null,
};

const mapStateToProps = state => {
    return {
        mostPopularList: state.mostPopularList,
        user: state.user.email
    }
};

const mapDispatchToProps = dispatch => ({
    setCurrentContent: (article) => dispatch(setCurrentContent(article)),
    loadContentList: (user) => dispatch(loadContentList(user)),
    loadMostPopular: () => dispatch(loadMostPopular()),
    connectionChange: (isConnected) => dispatch(offlineActionCreators.connectionChange(isConnected))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
