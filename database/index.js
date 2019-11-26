import firebase from 'firebase';
import '@firebase/firestore';
import secrets from '../secrets';

firebase.initializeApp(secrets);
let db = firebase.firestore();


export default db;
