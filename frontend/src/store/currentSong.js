
const SET_SONG = 'currentSong/setSong';

export const setSong = (song) => {
    return {
        type: SET_SONG,
        payload: song,
    };
};

const initialState = {};

//holds the current songs state information
export const currentSongReducer = (state = initialState, action) => {
    // let newState;
    switch (action.type) {
        case SET_SONG:
            return { currentSong: action.payload }
        default:
            return state;
    }
};
