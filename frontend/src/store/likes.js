import { fetch } from './csrf';
// import {fetch} from "node-fetch"
const SET_LIKES = 'likes/setLikes';
const REMOVE_LIKES = 'likes/setLikes';


//action creater that sets the song in the song slice of state
export const setLikes = (like) => {
    return {
        type: SET_LIKES,
        payload: like,
    };
};

export const createLike = (like) => async (dispatch) => {
    const { userId, songId } = like; //gets the username, email, and password inputs
    const response = await fetch("/api/likes", { //hits signup backend route to post the user info
        method: "POST",
        body: JSON.stringify({
            userId,
            songId
        }),
    });
    dispatch(setLikes(response.data.like)); //dispatch the action for setting the session user state
    return response;
};

const initialState = { };

//holds the current session user's information
const likesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_LIKES:
            newState = Object.assign({}, state, action.payload);
            return newState;
        case REMOVE_LIKES:
            newState = Object.assign({}, state);
            newState.like = null;
            return newState;
        default:
            return state;
    }
};




export default likesReducer;
