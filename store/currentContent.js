

const initialValue = {
    title: '',
    mainPic: '',
    text: '',
    url: ''
}

/*
    Action Types
*/

const SET_CURRENT_CONTENT = 'SET_CURRENT_CONTENT';

/*
    Action Creators
*/

export const setCurrentContent = content => ({
    type: SET_CURRENT_CONTENT,
    content
});

/*
    Reducer
*/

export default function (content = initialValue, action) {
    switch (action.type) {
        case SET_CURRENT_CONTENT:
            return action.content;
        default:
            return content;
    }
}
