import { fetch } from './csrf';
const SET_LIKED_SONGS = 'likedSongs/SET_LIKED_SONGS';
const REMOVE_LIKED_SONG = 'likedSongs/REMOVE_LIKED_SONG';

export const setLikedSongs = (songs) => {
    return {
        type: SET_LIKED_SONGS,
        payload: songs,
    };
};

export const removeLikedSong = (songId) => {
    return {
        type: REMOVE_LIKED_SONG,
        payload: songId,
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
        case REMOVE_LIKED_SONG:
            newState = { ...state }
            delete newState[action.payload]
            return newState;
        default:
            return state;
    }
};
