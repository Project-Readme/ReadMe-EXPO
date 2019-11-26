import firebase from 'firebase';
import '@firebase/firestore';
import secrets from '../secrets';

firebase.initializeApp(secrets);
let db = firebase.firestore();

let test = db.collection('content').doc('IT2LYbDKApMyfbDHU57l');

// In the process of trying to export the data to readContent component and load it into state. Having trouble reassigning the data and exporting it. See if you guts can do it
let dummyData;
test
  .get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      dummyData = doc.data();
      //let { text, title } = dummyData;
      //console.log(title, text);
      //console.log('Document data:', doc.data());
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });

//when I console log dummyData here it give me undefined even though I've reassigned dummyData to "doc.data()" on line 18
console.log(dummyData);
// should be 'db', but for testing purposes I used the dummyData from the
export default test;
