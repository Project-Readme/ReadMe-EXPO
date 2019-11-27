import * as firebase from "firebase";

/*
    default value
    */

const emptyUser = {
    email: '',
    displayName: ''
}

/*
    Action types
    */

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

/*
    thunkety-thunks
    */
  
export const signIn = (email, password) => async dispatch => {

    try {
        user = await firebase.auth()
                    .signInWithEmailAndPassword(email, password)
                    .currentUser;
        
        console.log("user", user);
        dispatch({
            type: LOGIN,
            user
        })
    } catch (error) {
        console.error(error);

    }
}
    
export const signOut = () =>  dispatch => {
    try {
        firebase.auth().signOut();
        dispatch ({
            type: LOGOUT,
        })
    } catch (error) {
        console.error(error)
    }
}

/*
    Reducer
    */

export default function(user = emptyUser, action) {
    switch(action.type) {
        case LOGIN:
            return action.user;
        case LOGOUT:
            return emptyUser;
        default:
            return user;
    }

}