import * as firebase from 'firebase';

/*
    default value
    */

const emptyUser = {
  email: '',
  displayName: '',
};

/*
    Action types
    */

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

/*
    thunkety-thunks
    */

export const signUp = (displayName, email, password) => async dispatch => {
  try {
    let userCredentials = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await userCredentials.user.updateProfile({ displayName });

    dispatch({
      type: LOGIN,
      user: { displayName, email },
    });
  } catch (error) {
    return error.message;
  }
};

export const signIn = (email, password) => async dispatch => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);

    user = firebase.auth().currentUser;

    dispatch({
      type: LOGIN,
      user: {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
      },
    });
  } catch (error) {
    return error.message;
  }
};

export const signOut = () => dispatch => {
  try {
    firebase.auth().signOut();
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

/*
    Reducer
    */

export default function(user = emptyUser, action) {
  switch (action.type) {
    case LOGIN:
      return action.user;
    case LOGOUT:
      return emptyUser;
    default:
      return user;
  }
}
