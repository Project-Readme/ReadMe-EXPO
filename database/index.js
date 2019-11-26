import firebase from 'firebase';
import '@firebase/firestore';
import secrets from '../secrets';

firebase.initializeApp(secrets);
let db = firebase.firestore();

let test = db.collection('content').doc('newArticle');
let newArticle = test
  .get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      // console.log('Document data:', doc.data());
      console.log('working')
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
// console.log(newArticle);
export default db;
