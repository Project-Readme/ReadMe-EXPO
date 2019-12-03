import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import TopBar from '../components/topBar';
import styles from '../styles';
import { connect } from 'react-redux';
import { setCurrentContent } from '../store/currentContent';

import Card from '../components/Card';
import { FlatList } from 'react-native-gesture-handler';
import ArticleCard from '../components/ArticleCard';

function Home (props) {


   const { navigate } = props.navigation;
   return (
        <View style={styles.homeContainer}>
            <TopBar />
            <Text style={styles.homeHeader}>Most Popular</Text>
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
            <Text style={styles.homeHeader}>Recent Articles</Text>
            <FlatList
                keyExtractor={article => article.title}
                data={props.mostRecentList}
                renderItem={article => {

                    return (
                        <TouchableOpacity
                        onPress={
                            () => {
                                props.setCurrentContent(article.item);
                                navigate('Article');
                            }
                        }
                        >
                        <View style={styles.recentBox}>
                            <ArticleCard image={{uri: article.item.image}} text={article.item.title} />
                        </View>
                        </TouchableOpacity>
                    )
                }}
             />
        </View>
    )
}

Home.navigationOptions = {
  header: null,
};

const mapStateToProps = state => {
    return {
        mostPopularList: state.mostPopularList,
        mostRecentList: state.mostRecentList,
        user: state.user.email
    }
};

const mapDispatchToProps = dispatch => ({
    setCurrentContent: (article) => dispatch(setCurrentContent(article)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
