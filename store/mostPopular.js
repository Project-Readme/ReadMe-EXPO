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
        .orderBy('popularity', 'desc')
        .limit(3)
        .get();

        res.docs.forEach(doc => {
            const data = doc.data();
            mostPopularList.push({
                id: doc.id,
                title: data.title,
                html: data.body,
                css: data.header,
                url: data.url,
                popularity: data.popularity,
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
