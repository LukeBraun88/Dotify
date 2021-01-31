import { fetch } from './csrf';
const SET_LIKES = 'likes/SET_LIKES';
const REMOVE_LIKE = 'likes/REMOVE_LIKE';

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
    dispatch(removeLike(res))
}


export const createLike = (like) => async (dispatch) => {
    const { userId, songId } = like;
    const response = await fetch("/api/likes", {
        method: "POST",
        body: JSON.stringify({
            userId,
            songId
        }),
    });
    return response;
};

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

const likesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_LIKES:
            newState = { ...state, ...action.payload }
            return newState;
        case REMOVE_LIKE:
            newState = { ...state }
            delete newState[action.likeId]
            return newState;
        default:
            return state;
    }
};

export default likesReducer;
