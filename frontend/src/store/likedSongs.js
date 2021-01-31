import { fetch } from './csrf';
import { useSelector } from 'react-redux'
import { songsReducer } from './songs';

const SET_LIKED_SONGS = 'likedSongs/SET_LIKED_SONGS';

//action creater that sets the song in the song slice of state
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

//holds the current songs state information
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
