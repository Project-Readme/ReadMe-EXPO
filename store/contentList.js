/*
    Action Types
*/
const LOAD_CONTENT_LIST = 'LOAD_CONTNENT_LIST';


/*
    Action Creators
*/

export const loadContentList = () => dispatch => {
    return {
        type: LOAD_CONTENT_LIST,
        contentList: []
    }
}


/*
    Reducer
*/

export default function (contentList = [], action) {
    switch (action.type) {
        case LOAD_CONTENT_LIST:
            return action.contentList;
        default:
            return contentList;
    }
}
