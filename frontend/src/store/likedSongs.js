import { fetch } from './csrf';
const SET_LIKED_SONGS = 'likedSongs/SET_LIKED_SONGS';

export const setLikedSongs = (songs) => {
    return {
        type: SET_LIKED_SONGS,
        payload: songs,
    };
};

export const getLikedSongs = (userId) => async dispatch => {
    const res = await fetch(`/api/likes/songs/${userId}`);
    const songs = res.data.songs
    let normalizedSongs = {}
    for (let i = 0; i < songs.length; i++) {
        const song = songs[i]
        normalizedSongs[song.id] = song
    }
    dispatch(setLikedSongs(normalizedSongs))
};

const initialState = {};

export const likedSongsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_LIKED_SONGS:
            newState = Object.assign({}, state, action.payload);
            return newState;
        default:
            return state;
    }
};
