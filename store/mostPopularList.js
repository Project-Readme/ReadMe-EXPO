import db from '../database';

/*
    Action Types
*/
const GET_MOST_POPULAR = 'GET_MOST_POPULAR';

/*
    Action Creators
*/

export const loadMostPopular = () => async dispatch => {
    try {

        const mostPopularList = [];
        const res = await db.collection('articles')
        .orderBy('Popularity', 'desc')
        .limit(5)
        .get();

        res.docs.forEach(doc => {
            const data = doc.data();
            mostPopularList.push({
                id: doc.id,
                title: data.Title,
                body: data.Body,
                head: data.Head,
                image: data.Image,
            })
        })

        dispatch({
            type: GET_MOST_POPULAR,
            mostPopularList
        });

    } catch (error) {
        console.error(error);
    }

}


/*
    Reducer
*/

export default function (mostPopularList = [], action) {
    switch (action.type) {
        case GET_MOST_POPULAR:
            return action.mostPopularList;
        default:
            return mostPopularList;
    }
}
