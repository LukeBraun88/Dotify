import { fetch } from './csrf';
// import {fetch} from "node-fetch"
const SET_LIKES = 'likes/SET_LIKES';
const REMOVE_LIKE = 'likes/REMOVE_LIKE';


//action creater that sets the song in the song slice of state
export const setLikes = (like) => {
    return {
        type: SET_LIKES,
        payload: like,
    };
};
export const removeLike = (likeId) => {
    return {
        type: REMOVE_LIKE,
        payload: likeId
    };
};


export const deleteLikeStore = ({ userId, songId }) => async (dispatch) => {
    const res = await fetch(`api/likes/${userId}/${songId}`, {
        method: "DELETE"
    })
    console.log("deleteLikeStore res",res)
    dispatch(removeLike(res))
}


export const createLike = (like) => async (dispatch) => {
    const { userId, songId } = like; //gets the username, email, and password inputs
    const response = await fetch("/api/likes", { //hits signup backend route to post the user info
        method: "POST",
        body: JSON.stringify({
            userId,
            songId
        }),
    });
    // dispatch(setLikes(response.data.like)); //dispatch the action for setting the session user state
    return response;
};

// export const removeLike = (like)=>async(dispatch)=>{
//     const { userId, songId } = like; //gets the username, email, and password inputs
//     const response = await fetch("/api/likes", { //hits signup backend route to post the user info
//         method: "DELETE",
//         body: JSON.stringify({
//             userId,
//             songId
//         }),
//     });
//     dispatch(setLikes(response.data.like)); //dispatch the action for setting the session user state
//     return response;
// };


export const getLikes = () => async dispatch => {
    const res = await fetch('/api/likes');
    const likes = res.data.likes
    let normalizedLikes = {}
    for (let i = 0; i < likes.length; i++) {
        const like = likes[i]
        normalizedLikes[like.id] = like
    }
    dispatch(setLikes(normalizedLikes))
};

const initialState = {};

//holds the current session user's information
const likesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_LIKES:
            newState = {...state,...action.payload}
            return newState;
        case REMOVE_LIKE:
            newState = {...state}
            console.log("action.payload",action.payload)
            delete newState[action.likeId]
            return newState;
        default:
            return state;
    }
};




export default likesReducer;
