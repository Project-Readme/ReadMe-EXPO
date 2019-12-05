import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import TopBar from '../components/topBar';
import styles from '../styles';
import ArticleCard from '../components/ArticleCard';
import Animation from 'lottie-react-native';

import { connect } from 'react-redux';

import cheerio from 'react-native-cheerio'
import axios from 'axios';
import db from '../database';
import firebase from 'firebase'
import { loadContentList } from '../store/contentList'
import { loadMostPopular } from '../store/mostPopularList'

const dummy = [
    {
        title: 'How to Build a Simple Chrome Extension in Vanilla JavaScript',
        img: { uri: 'https://miro.medium.com/max/2957/1*HwO6wiOHiJrN1_jePQrmEA.jpeg' }
    },
    {
        title: 'How to Perform Web-Scraping using Node.js',
        img: { uri: 'https://miro.medium.com/max/4592/1*tBBX7RGFkadc_yiShZLDCQ.jpeg' }
    },
    {
        title: 'You Don’t Understand Bitcoin Because You Think Money Is Real',
        img: { uri: 'https://miro.medium.com/max/3887/1*1DQEeByasuoteYxoySd5SA.jpeg' }
    },
    {
        title: 'The Real Cost of Phone Addiction',
        img: { uri: 'https://miro.medium.com/max/2400/1*wMjnTSs_-znQ2NRUjysK4w.png' }
    },
    {
        title: 'Easily Build Forms in React Native',
        img: { uri: 'https://miro.medium.com/max/3264/1*OULxgHA3QB60xpOlUJg0QA.jpeg' }
    },
]

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            input: '',
            searched: false,
            added: false
        }
    }
    // componentDidMount() {
    //     this.initAnimation()
    // }

    // initAnimation() {
    //     if (!this.animation) {
    //         setTimeout(() => {
    //             this.initAnimation();
    //         }, 100);
    //     } else {
    //         this.animation.play();
    //     }
    // }

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
                    const img = $("meta[property='og:image']").attr('content')
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
                    this.setState({ searched: true, added: true })
                } catch (err) {
                    console.error(err)
                    this.setState({ searched: true, added: false })
                }
            }
        } else {
            this.setState({ searched: true, added: false })
        }
    }

    render() {
        console.log(this.animation)
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
                    <TouchableOpacity style={styles.searchButton} onPress={this.getArticle}>
                        <Text style={{ color: '#FFF', fontWeight: '500', fontSize: 18 }}>Add</Text>
                    </TouchableOpacity>
                </View>
                {this.state.searched ?
                    [(this.state.added ?
                        <Animation
                        ref={ animation => {
                            this.animation = animation;
                          }}
                        style={{
                          width: 90,
                          height: 90,
                        }}
                        source={require('../assets/book.json')}
                        /> :
                        <Text key="error" style={styles.statusText}>Error adding</Text>)] :
                    <Text style={styles.statusText} />
                }
                <Text style={{ color: '#747882', padding: 10, paddingBottom: 0, fontSize: 24, fontWeight: 'bold' }}>Recommended</Text>
                <FlatList
                    keyExtractor={article => article.title}
                    data={dummy}
                    renderItem={article => {
                        return (
                            <View style={{ borderColor: 'black', borderBottomWidth: 1, paddingTop: 10, paddingBottom: 5 }}>
                                <ArticleCard image={article.item.img} text={article.item.title} />
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
}

mapStateToProps = state => {
    return {
        user: state.user
    }
}

mapDispatchToProps = dispatch => {
    return {
        loadContentList: (user) => dispatch(loadContentList(user)),
        loadMostPopular: () => dispatch(loadMostPopular())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
