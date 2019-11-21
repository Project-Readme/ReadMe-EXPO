

import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';


export default class ReadContent extends React.Component {

    constructor() {
        super();
        this.state = {
            title: 'More Powerful Batteries Make This a True Electric Car Race',
            text: `When the 2019-2020 Formula E season kicks off in the Saudi city of Diriyah this weekend, the all-electric racing series will be missing a hallmark of the sport’s early years: the car swap. In its first four seasons, the batteries powering cars couldn’t last the full 45-minute race. So drivers stopped in the pits halfway through and ditched their steering wheels, giving themselves room to hop from their spent ride into one with a fully charged battery, as their pit crew buckled them in.
        
            The process looked silly. More important, Peter Rawlinson says, it undercut the mission of Formula E. Instead of proving electric cars are just as good as gas-powered ones, it emphasized their shortcomings. Rawlinson is the CEO of startup automaker Lucid, which, in addition to preparing its first passenger car for market, produces the batteries that now take the whirring race cars from start to finish, no pit stop or car swap necessary.`,
            mainPic: 'https://media.wired.com/photos/5dd5921332c5e00009b2bf39/master/w_2560%2Cc_limit/Transpo-Eracing-1161932818-2.jpg',
            url: 'https://www.wired.com/story/more-powerful-batteries-make-true-electric-car-race/'
        
        }
    }

    // componentDidMount() {
    //     this.loadData();
    // }

    // loadData() {
    // }

    render() {
        if (this.state) {
        return (
            <View style = {styles.container}>
                <View style={styles.titleView}>
                <Text style={styles.titleText}>{this.state.title || " "}</Text>
                </View>
                <View style={styles.text}>
                    <Text>{this.state.text || " "}</Text>
                </View>
            </View>
        )
        } else {
            return(<View><Text style={styles.title}>Where is your article?</Text></View>)
        }
    }

}