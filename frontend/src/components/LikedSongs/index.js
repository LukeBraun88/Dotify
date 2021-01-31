import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import * as songActions from "../../store/songs"
import * as likeActions from "../../store/likes"
import * as currentSongActions from "../../store/currentSong"
import * as likesActions from "../../store/likes"
import * as likedSongsActions from "../../store/likedSongs"
import "../AllSongs/AllSongs.css"
import "./LikedSongs.css"
import { NavLink } from 'react-router-dom'



function LikedSongs() {

    const dispatch = useDispatch();

    //we are getting my current songs state
    const songs = useSelector((state) => Object.values(state.songs));
    const sessionUser = useSelector((state) => state.session.user);
    const likes = useSelector((state) => state.likes);
    const likedSongs = useSelector((state) => state.likedSongs);

    // when the page is loaded, my songs are updated

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(songActions.getSongs())
        dispatch(likesActions.getLikes())
        // dispatch(likedSongsActions.getLikedSongs(sessionUser.id))

    }, [])



    function unLikeSong(songId) {

        const userId = sessionUser.id
        dispatch(likeActions.deleteLikeStore({ userId, songId }))
        dispatch(likesActions.getLikes())
        // dispatch(likeActions.removeLike({}))
        // return dispatch(likeActions.createLike({ userId, songId }))
    }
    function deleteSong(songId) {
        let newErrors = [];
        // const userId = sessionUser.id
        return dispatch(songActions.deleteSongStore(songId))
    }


    return (
        <>

                <div className="container">
                    <div className="music">
            <div className="all-songs">
                {/* {likedSongs.map(song =>
                (<li className="song-lists" key={song.id}>

                    <h2 className="song-title">{song.name}</h2>
                    <p className="song-artist">{song.artist}</p>
                    <audio controls className="music-controls">
                        <source src={song.filePath} type="audio/mp3" />
                    </audio>
                    <div className="options">
                        <button value={song.id} onClick={() => unLikeSong(song.id)}>
                            <i className="fas fa-heart unLike song-icon" value={song.id}></i>
                        </button>
                        <button value={song.id} onClick={() => deleteSong(song.id)}>
                            <i className="fas fa-times removeSong song-icon" value={song.id} ></i>
                        </button>
                    </div>

                </li>))
                } */}
            </div>

                    </div>

                </div>

        </>
    )
}
export default LikedSongs;
