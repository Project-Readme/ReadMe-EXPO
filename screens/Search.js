import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import TopBar from '../components/topBar';
import styles from '../styles';
import ArticleCard from '../components/ArticleCard'

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
        title: 'How to Build a Simple Chrome Extension',
        img: { uri: 'https://miro.medium.com/max/2957/1*HwO6wiOHiJrN1_jePQrmEA.jpeg' }
    },
]

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            input: ''
        }
    }

    searchInputHandler = input => {
        this.setState({ input })
    }

    render() {
        return (
            <View>
                <TopBar></TopBar>
                <View style={styles.searchBarContainer}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Paste article URL here!</Text>
                    <TextInput
                        placeholder="Search"
                        style={styles.searchBar}
                        onChangeText={this.searchInputHandler}
                    >
                    </TextInput>
                    <TouchableOpacity style={styles.searchButton}>
                        <Text style={{ color: '#FFF', fontWeight: '500', fontSize: 18 }}>
                            Add
                        </Text>
                    </TouchableOpacity>
                </View>
                {this.state.status ? <Text style={styles.statusText}></Text> : <Text style={styles.statusText}>Added Successful!</Text>}
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

export default Search;