import { fetch } from './csrf';
// import {fetch} from "node-fetch"
const SET_SONGS = 'songs/SET_SONGS';
const REMOVE_SONG = 'songs/REMOVE_SONG'

//action creater that sets the song in the song slice of state
export const setSongs = (songs) => {
    return {
        type: SET_SONGS,
        payload: songs,
    };
};

export const removeSong = (songId) => {
    return {
        type: REMOVE_SONG,
        payload: songId,
    };
}


export const deleteSongStore = (songId) => async (dispatch)=>{
    const res = await fetch(`api/songs/${songId}`,{
        method: "DELETE"
    })
    dispatch(removeSong(songId))
}



//thunk which accepts an object of key value pairs and turns them into FormData entries to send with your request.
export const createSong = (song) => async (dispatch) => {
    const { name, artist, songFile, userId } = song; //can add images if multiple

    const formData = new FormData();
    formData.append("name", name);
    formData.append("artist", artist);
    formData.append("songFile", songFile);
    formData.append("userId", userId);

    // for multiple files
    // if (images && images.length !== 0) {
    //     for (var i = 0; i < images.length; i++) {
    //         formData.append("images", images[i]);
    //     }
    // }

    // for single file
    const res = await fetch(`/api/songs/`, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: formData,
    });

    // dispatch(setSongs(res.data.song));
};




//this is the thunk that
// 1) gets songs from route
// 2) normalizes song data
// 3) updates state
//         - dispatches action creator
//         - action runs in reducer which updates state

export const getSongs = () => async dispatch => {
    const res = await fetch('/api/songs');
    const songs = res.data.songs
    console.log("songs-----", songs)
    let normalizedSongs = {}
    for (let i =0; i<songs.length; i++){
        const song = songs[i]
        normalizedSongs[song.id] = song
    }
    console.log("normalizedSongs", normalizedSongs)
    dispatch(setSongs(normalizedSongs))
};

const initialState = {};

//holds the current songs state information
export const songsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_SONGS:
            newState = Object.assign({}, state, action.payload);
            return newState;
        case REMOVE_SONG:
            newState = { ...state }
            delete newState[action.payload]
            return newState;
        default:
            return state;
    }
};
