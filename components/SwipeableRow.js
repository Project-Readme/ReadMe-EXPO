import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ArticleCard from '../components/ArticleCard';

import db from '../database';
import styles from '../styles';
import { connect } from 'react-redux'
import { setCurrentContent } from '../store/currentContent';
import { loadContentList } from '../store/contentList';

class SwipeableRow extends React.Component {
    leftActions = () => (
        <TouchableOpacity style={styles.swipeableAdd} onPress={() => {
            this.close()
            this.addArticle(this.props.article)
        }}>
            <View>
                <Entypo name="add-to-list" size={36} style={{ paddingTop: '1%' }}></Entypo>
            </View>
        </TouchableOpacity>
    )

    async addArticle(article) {
        const url = article.url.split('/').join('')
        try {
            const article = await db.collection('articles').doc(url).get()
            const data = article.data()
            const ref = await db.collection('users').doc(this.props.user).collection('articles').doc(url)
            ref.set({
                Title: data.Title,
                Body: data.Body,
                Head: data.Head,
                URL: data.URL,
                Image: data.Image
            })
            this.props.loadContentList(this.props.user)
            alert('Article Added!')
        } catch (err) {
            console.log('error', err)
        }
    }

    updateRef = ref => {
        this._swipeableRow = ref;
    };

    close = () => {
        this._swipeableRow.close();
    };

    render() {
        const { children } = this.props;
        return (
            <Swipeable
                ref={this.updateRef}
                renderLeftActions={this.leftActions}>
                {children}
                <TouchableOpacity
                    onPress={
                        () => {
                            this.props.setCurrentContent(this.props.article);
                            this.props.navigate('Article');
                        }
                    }
                >
                    <View style={styles.recentBox}>
                        <ArticleCard image={this.props.image} text={this.props.text} />
                    </View>
                </TouchableOpacity>
            </Swipeable>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.email
    }
};

const mapDispatchToProps = dispatch => ({
    setCurrentContent: (article) => dispatch(setCurrentContent(article)),
    loadContentList: (user) => dispatch(loadContentList(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(SwipeableRow)