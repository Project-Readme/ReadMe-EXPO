import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import TopBar from '../components/topBar';
import styles from '../styles';
import SwipeableRow from '../components/SwipeableRow';
import Success from '../components/SuccessAnim';
import FadingAnimation from '../components/FadingAnimation';
import Failed from '../components/FailedSearchAnim';

import { connect } from 'react-redux';

import cheerio from 'react-native-cheerio';
import axios from 'axios';
import db from '../database';
import firebase from 'firebase';
import { loadContentList } from '../store/contentList';
import { loadMostPopular } from '../store/mostPopularList';
import { loadRecommended } from '../store/recommendedList';
import { setCurrentContent } from '../store/currentContent';

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            input: '',
            searched: false,
            added: false,
        }
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        this.props.loadRecommended();
    }

    searchInputHandler = input => {
        this.setState({ input })
    }

    getArticle = async () => {
        let incriment = firebase.firestore.FieldValue.increment(1);

        if (this.state.input) {
            const regex = /(ftp|http|https):\/\//
            if (regex.test(this.state.input)) {
                try {
                    const { data } = await axios.get(this.state.input)
                    const $ = cheerio.load(data)
                    const title = $('title').text()
                    const head = `<head>${$('head').html()}<head>`
                    const article = `<article>${$('article').html()}</article>`
                    let img = $("meta[property='og:image']").attr('content')
                    if (!img) {
                        img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_35AO4At-OgU5XSRRxpHcw8mM4sPrq4Y11t2tdLCJh1A1JEQBQ&s'
                    }
                    const url = this.state.input.split('/').join('')

                    const usersRef = await db.collection('users').doc(`${this.props.user.email}`).collection('articles')
                        .doc(url)

                    usersRef.set({
                        URL: this.state.input,
                        Head: head,
                        Body: article,
                        Title: title,
                        Image: img,
                    })
                    const realUrl = this.state.input
                    const articlesRef = db.collection('articles').doc(url)
                    const now = Date.now()
                    articlesRef.get().then(function (doc) {
                        if (doc.exists) {
                            db.collection('articles').doc(url).update({ Popularity: incriment });
                        } else {
                            // doc.data() will be undefined in this case
                            articlesRef.set({
                                URL: realUrl,
                                Head: head,
                                Body: article,
                                Title: title,
                                Image: img,
                                Popularity: 1,
                                Created: now
                            })
                        }
                    })
                    this.props.loadContentList(this.props.user.email)
                    this.props.loadMostPopular()
                    this.textInput.clear()
                    this.setState({ searched: true, added: true, input: '' })
                } catch (err) {
                    console.error(err)
                    this.setState({ searched: true, added: false })
                }
            }
        } else {
            this.setState({ searched: true, added: false })
        }
    }

    resetSearch() {
        setTimeout(() => this.setState({ searched: false, added: false }), 3100)
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <TopBar />
                <View style={styles.searchBarContainer}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Paste article URL here!</Text>

                    <TextInput
                        placeholder="Add"
                        style={styles.searchBar}
                        onChangeText={this.searchInputHandler}
                        ref={input => { this.textInput = input }}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={() => {
                        this.getArticle()
                        this.resetSearch()
                    }}>
                        <Text style={{ color: '#FFF', fontWeight: '500', fontSize: 18 }}>Add</Text>
                    </TouchableOpacity>
                </View>
                {this.state.searched ?
                    [(this.state.added ?
                        <FadingAnimation key="added">
                            <Success />
                        </FadingAnimation>
                        :
                        <FadingAnimation key="added" style={{ height: 70, }}>
                            <Failed />
                        </FadingAnimation>
                    )] :
                    <Text style={styles.animation} />
                }
                <Text style={{ color: '#747882', padding: 10, paddingBottom: 0, fontSize: 24, fontWeight: 'bold' }}>Recommended</Text>
                <FlatList
                    keyExtractor={article => article.title}
                    data={this.props.recommendedList}
                    renderItem={article => {
                        return (
                            <SwipeableRow
                                image={{ uri: article.item.image }}
                                text={article.item.title}
                                article={article.item}
                                navigate={navigate}>
                            </SwipeableRow>
                        )
                    }}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        recommendedList: state.recommendedList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadContentList: (user) => dispatch(loadContentList(user)),
        setCurrentContent: (article) => dispatch(setCurrentContent(article)),
        loadMostPopular: () => dispatch(loadMostPopular()),
        loadRecommended: () => dispatch(loadRecommended())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
