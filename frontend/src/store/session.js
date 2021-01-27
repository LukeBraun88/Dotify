 //contains all the actions specific to the session user's information and the session user's Redux reducer

import { fetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

//action creater that sets the user in the session slice of state
const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};
//thunk which accepts an object of key value pairs and turns them into FormData entries to send with your request.
export const createUser = (user) => async (dispatch) => {
    const { images, image, username, email, password } = user;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    // for multiple files
    // if (images && images.length !== 0) {
    //     for (var i = 0; i < images.length; i++) {
    //         formData.append("images", images[i]);
    //     }
    // }

    // for single file
    if (image) formData.append("image", image);

    const res = await fetch(`/api/users/`, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: formData,
    });

    dispatch(setUser(res.data.user));
};

//action creator that removes the session user
const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

//thunk that restores the session user
export const restoreUser = () => async dispatch => {
    const res = await fetch('/api/session');
    dispatch(setUser(res.data.user));
    return res;
};

//thunk that calls the API to login then sets the session user from the response
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await fetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    dispatch(setUser(response.data.user));
    return response;
};

//logout thunk action
export const logout = () => async (dispatch) => {
    const response = await fetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};

//signup thunk
export const signup = (user) => async (dispatch) => {
    const { username, email, password, profileImageUrl } = user; //gets the username, email, and password inputs
    const response = await fetch("/api/users", { //hits signup backend route to post the user info
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password,
            profileImageUrl
        }),
    });
    dispatch(setUser(response.data.user)); //dispatch the action for setting the session user state
    return response;
};

const initialState = { user: null };

//holds the current session user's information
const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        // case SET_USER:
        //     newState = Object.assign({}, state);
        //     newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};




export default sessionReducer;
