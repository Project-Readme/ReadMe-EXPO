
import db from '../database';

/*
    Action Types
*/
const LOAD_CONTENT_LIST = 'LOAD_CONTNENT_LIST';


/*
    Action Creators
*/

export const loadContentList = () => async dispatch => {

    try {

        const contentList = [];
        const res = await db.collection('content').get()


        res.docs.forEach(doc => {
            const data = doc.data();
            contentList.push({
                id: doc.id,
                title: data.Title,
                html: data.HTML,
                css: data.CSS,
                url: data.URL
            })
        })

        dispatch({
            type: LOAD_CONTENT_LIST,
            contentList
        });

    } catch (error) {
        console.error(error);
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
