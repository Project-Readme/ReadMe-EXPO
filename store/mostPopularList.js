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
        const mostRecentList = [];
        const res1 = await db.collection('articles')
            .orderBy('Popularity', 'desc')
            .limit(5)
            .get();

        res1.docs.forEach(doc => {
            const data = doc.data();
            mostPopularList.push({
                id: doc.id,
                title: data.Title,
                body: data.Body,
                head: data.Head,
                image: data.Image,
            })
        })

        const res2 = await db.collection('articles')
            .orderBy('Created', 'desc')
            .limit(5)
            .get();

        res2.docs.forEach(doc => {
            const data = doc.data();
            mostRecentList.push({
                id: doc.id,
                title: data.Title,
                body: data.Body,
                head: data.Head,
                image: data.Image,
            })
        })


        dispatch({
            type: GET_MOST_POPULAR,
            mostPopularList,
            mostRecentList
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
