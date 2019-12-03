import db from '../database';

/*
    Action Types
*/
const GET_MOST_POPULAR = 'GET_MOST_POPULAR';


/*
    Reducer
*/

export default function (mostRecentList = [], action) {
    switch (action.type) {
        case GET_MOST_POPULAR:
            return action.mostRecentList;
        default:
            return mostRecentList;
    }
}
