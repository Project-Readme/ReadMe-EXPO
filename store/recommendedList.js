import db from '../database';

/*
    Action Types
*/
const GET_RECOMMENDED = 'GET_RECOMMENDED';

/*
    Action Creators
*/

export const loadRecommended = () => async dispatch => {
    try {

        const recommendedList = [];
        const res = await db.collection('recommended').get();

        res.docs.forEach(doc => {
            const data = doc.data();
            recommendedList.push({
                id: doc.id,
                title: data.Title,
                body: data.Body,
                head: data.Head,
                image: data.Image,
                url: data.URL
            })
        })

        dispatch({
            type: GET_RECOMMENDED,
            recommendedList,
        });

    } catch (error) {
        console.error(error);
    }

}


/*
    Reducer
*/

export default function (recommendedList = [], action) {
    switch (action.type) {
        case GET_RECOMMENDED:
            return action.recommendedList;
        default:
            return recommendedList;
    }
}
