// import { fetch } from './csrf';
// import {fetch} from "node-fetch"
const SET_SONGS = 'songs/setSongs';
const ADD_SONG = 'songs/addSong'

//action creater that sets the song in the song slice of state
export const setSongs = (songs) => {
    return {
        type: SET_SONGS,
        payload: songs,
    };
};

export const addSong = (song) => {
    return {
        type: ADD_SONG,
        payload: song,
    };
}


//thunk which accepts an object of key value pairs and turns them into FormData entries to send with your request.
export const createSong = (song) => async (dispatch) => {
    const { name, artist, songFile } = song; //can add images if multiple
    const formData = new FormData();
    formData.append("name", name);
    formData.append("artist", artist);
    formData.append("songFile", songFile);

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
    dispatch(setSongs(res.data.song));
};

export const songPOST = (song) => async (dispatch) => {
    const {name, artist, filePath, songFile}  = song; //gets the username, email, and password inputs
    const response = await fetch("/api/songs", { //hits signup backend route to post the user info
        method: "POST",
        body: JSON.stringify({
            name,
            artist,
            filePath,
            songFile
        }),
    });
    dispatch(setSongs(response.data.song)); //dispatch the action for setting the session user state
    return response;
};


//this is the thunk that
// 1) gets songs from route
// 2) normalizes song data
// 3) updates state
//         - dispatches action creator
//         - action runs in reducer which updates state

export const getSongs = () => async dispatch => {
    // console.log("gettingSongs----------------------------")
    const res = await fetch('/api/songs');
    const json = await res.json()
    // console.log("json",json)
    const songs = json.songs
    // console.log("songs",songs)
    let normalizedSongs = {}
    for (let i =0; i<songs.length; i++){
        const song = songs[i]
        normalizedSongs[song.id] = song
    }
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
        default:
            return state;
    }
};
