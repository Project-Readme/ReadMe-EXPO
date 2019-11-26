import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from '../styles';

import db from '../database';

export default class ReadContent extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'More Powerful Batteries Make This a True Electric Car Race',
      text: `When the 2019-2020 Formula E season kicks off in the Saudi city of Diriyah this weekend, the all-electric racing series will be missing a hallmark of the sport’s early years: the car swap. In its first four seasons, the batteries powering cars couldn’t last the full 45-minute race. So drivers stopped in the pits halfway through and ditched their steering wheels, giving themselves room to hop from their spent ride into one with a fully charged battery, as their pit crew buckled them in.
        
            The process looked silly. More important, Peter Rawlinson says, it undercut the mission of Formula E. Instead of proving electric cars are just as good as gas-powered ones, it emphasized their shortcomings. Rawlinson is the CEO of startup automaker Lucid, which, in addition to preparing its first passenger car for market, produces the batteries that now take the whirring race cars from start to finish, no pit stop or car swap necessary.
            
            Those trapezoidal batteries, packing 54 kilowatt-hours of energy—nearly twice as much as the old power packs—and sitting just behind the driver, made their debut a year ago. They powered every car for the duration of the 2018-2019 season, but Lucid didn’t disclose it was behind them. Now that they’ve proven themselves worthy of another year’s work, Rawlinson is happy to take public credit and reveal some details about how his team made it happen.
The process kicked off in 2016, when Lucid won the contract to provide batteries for the race series. (At the time, it was known as Atieva. The company started off making batteries for electric buses and other commercial vehicles. It changed its name to Lucid when it decided to make consumer cars, but maintains that business. It’s funding the new car effort with more than $1 billion from Saudi Arabia’s sovereign wealth fund.) The team started by looking through a database of cell chemistries. The trick was finding the right balance between what Rawlinson calls sprinters and marathoners: cells that can produce a lot of energy in short bursts, and those that can maintain the output for extended periods. A 45-minute race requires endurance, but also speeds of up to 174 mph. The cells themselves came from Lucid’s Japan-based supplier, Murata.
Then came the question of how to fit the battery into the car. The first generation of Formula E batteries was rectangular, and fit awkwardly into the open-wheel, Coke bottle-shaped race cars. Rawlinson wanted a battery that tapered from front to back, like the car itself. That was a problem, because the packs Lucid uses, the building blocks of the battery, are shaped like VCRs. Ultimately, Rawlinson decided to stack different sized packs, creating a ziggurat-style unit. His engineers filled the resulting triangular gaps with various electronics and cooling cables. The result, wrapped in a carbon fiber shell, weighs 860 pounds, getting each team nearly halfway to the minimum weight (including the driver) of 1,984 pounds.
At Lucid headquarters in Newark, California, employees built enough battery packs to power the 14 teams competing this season. The big white room where they did their work is now empty, and will remain that way until May, when it’s time to build a new batch for the seventh Formula E season.
Rawlinson, who led the engineering development of the Tesla Model S during a three-year stint with Elon Musk, had worried that the project would distract from the pressing task of creating the all-new Lucid Air. But, he says, the project yielded lessons for the consumer car, like how to move current more efficiently through the pack and how to reduce power loss between cells. Turns out that motorsports is keeping up the long tradition of fueling advances in consumer tech, even when the fuel itself is no longer needed.`,
      mainPic:
        'https://media.wired.com/photos/5dd5921332c5e00009b2bf39/master/w_2560%2Cc_limit/Transpo-Eracing-1161932818-2.jpg',
      url:
        'https://www.wired.com/story/more-powerful-batteries-make-true-electric-car-race/',
    };
  }

  componentDidMount() {
      this.loadData();
  }

  async loadData() {

//     let test = db.collection('content').doc('newArticle');
// let newArticle = test
//   .get()
//   .then(doc => {
//     if (!doc.exists) {
//       console.log('No such document!');
//     } else {
//       // console.log('Document data:', doc.data());
//       console.log('working')
//     }
//   })
//   .catch(err => {
//     console.log('Error getting document', err);
//   });
// // console.log(newArticle);

    let articles = await db.collection('content').get();

      console.log("we have", articles.docs.length, "articles in the database")
      //articles.docs.forEach(doc => console.log(doc));

    try {
      
    } catch (error) {
      console.error(error);
    }

  }

  render() {
    return (
      <View style={styles.readingContainer}>
        <ScrollView>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>{this.state.title}</Text>
          </View>
          <View style={styles.text}>
            <Text>{this.state.text}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
