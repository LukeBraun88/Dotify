import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import * as songActions from "../../store/songs"
import * as likeActions from "../../store/likes"
import * as currentSongActions from "../../store/currentSong"
import * as likesActions from "../../store/likes"
import * as likedSongsActions from "../../store/likedSongs"
import "./AllSongs.css"
import { NavLink } from 'react-router-dom'



function AllSongs() {

    const dispatch = useDispatch();

    const songs = useSelector((state) => Object.values(state.songs));
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id

    useEffect(() => {
        dispatch(songActions.getSongs())
        dispatch(likesActions.getLikes())
        dispatch(likedSongsActions.getLikedSongs(userId))
    }, [dispatch])


    function likeSong(songId) {
        dispatch(likeActions.createLike({ userId, songId }))
        dispatch(likesActions.getLikes())
    }
    function unLikeSong(songId) {
        dispatch(likeActions.deleteLikeStore({ userId, songId }))
        dispatch(likesActions.getLikes())
    }
    function deleteSong(songId) {
        dispatch(songActions.deleteSongStore(songId))
    }


    return (
        <>
            <div className="container">
                <div className="music">

                    <div className="all-songs">
                        {songs.map(song =>
                        (<li className="song-lists" key={song.id}>

                            <h2 className="song-title">{song.name}</h2>
                            <p className="song-artist">{song.artist}</p>
                            <audio controls className="music-controls">
                                <source src={song.filePath} type="audio/mp3" />
                            </audio>
                            <div className="options">
                                <button className="song-button" value={song.id} onClick={() => likeSong(song.id)}>
                                    <i className="fas fa-heart Like song-icon" value={song.id}></i>
                                </button>
                                <button className="song-button" value={song.id} onClick={() => unLikeSong(song.id)}>
                                    <i className="fas fa-heart unLike song-icon" value={song.id}></i>
                                </button>
                                <button className="song-button" value={song.id} onClick={() => deleteSong(song.id)}>
                                    <i className="fas fa-times removeSong song-icon" value={song.id} ></i>
                                </button>
                            </div>

                        </li>))
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default AllSongs;
