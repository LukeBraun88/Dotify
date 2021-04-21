import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import * as songActions from "../../store/songs"
import * as likeActions from "../../store/likes"
import * as currentSongActions from "../../store/currentSong"
import * as likesActions from "../../store/likes"
import * as likedSongsActions from "../../store/likedSongs"
import "./AllSongs.css"
import Song from "../Song"
import { NavLink } from 'react-router-dom'



function AllSongs() {

    const dispatch = useDispatch();

    const songs = useSelector((state) => Object.values(state.songs));
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id

    useEffect(() => {
        dispatch(songActions.getSongs())
        // dispatch(likesActions.getLikes())
        // dispatch(likedSongsActions.getLikedSongs(userId))
    }, [])


    function likeSong(songId) {
        dispatch(likeActions.createLike({ userId, songId }))
        dispatch(likesActions.getLikes())
        dispatch(likedSongsActions.getLikedSongs(userId))
    }
    function unLikeSong(songId) {
        dispatch(likedSongsActions.removeLikedSong(songId))
        dispatch(likeActions.deleteLikeStore({ userId, songId }))
        dispatch(likesActions.getLikes())
    }
    function deleteSong(songId) {
        dispatch(songActions.deleteSongStore(songId))
    }

    useEffect(() => {
        var element1 = document.getElementById("liked");
        element1.classList.remove("clicked");
        var element2 = document.getElementById("songs");
        element2.classList.add("clicked");
        var element3 = document.getElementById("upload");
        element3.classList.remove("clicked");
    }, [])


    return (
        <>
            <div className="container">
                <div className="music">
                    {/* <p className='title'>All Songs</p> */}
                    <div className="all-songs">
                        <div className="headers">
                            <p className="play_header">play</p>
                            <div className="seperator_header1"></div>
                            <p className="like_header">like</p>
                            <div className="seperator_header2"></div>
                            <p className="title_header">title</p>
                            <div className="seperator_header3"></div>
                            <p className="artist_header">artist</p>
                            {/* <div className="seperator_header4"></div>
                            <p className="unlike_header">unlike</p> */}
                            <div className="seperator_header5"></div>
                            <p className="delete_header">delete</p>
                        </div>
                        {songs.map(song =>
                        (<li className="song-lists" key={song.id}>
                            <div className="song-container">
                                <Song songId={song.id} name={song.name} artist={song.artist} filePath={song.filePath}/>
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
