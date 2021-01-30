import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {useEffect, useState} from 'react'
import * as songActions from "../../store/songs"
import * as likeActions from "../../store/likes"
import * as currentSongActions from "../../store/currentSong"
import * as likesActions from "../../store/likes"
import "./AllSongs.css"
import {NavLink} from 'react-router-dom'



 function AllSongs(){

    const dispatch = useDispatch();

    //we are getting my current songs state
    const songs = useSelector((state) => Object.values(state.songs));
    const sessionUser = useSelector((state) => state.session.user);
    const likes = useSelector((state) => state.likes);

    // when the page is loaded, my songs are updated

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(songActions.getSongs())
        dispatch(likesActions.getLikes())

    }, [])


    function likeSong(songId){
        let newErrors = [];
        const userId = sessionUser.id
        dispatch(likeActions.createLike({ userId, songId }))
        dispatch(likesActions.getLikes())
    }
    function unLikeSong(songId){

        const userId = sessionUser.id
        dispatch(likeActions.deleteLikeStore({ userId, songId }))
        dispatch(likesActions.getLikes())
        // dispatch(likeActions.removeLike({}))
        // return dispatch(likeActions.createLike({ userId, songId }))
    }
    function deleteSong(songId){
        let newErrors = [];
        // const userId = sessionUser.id
        return dispatch(songActions.deleteSongStore( songId ))
    }


    return(
        <>
        <div className="all-songs">
        {songs.map(song=>
        (<li className="song-lists" key={song.id}>

                <h2 className="song-title">{song.name}</h2>
                <p className="song-artist">{song.artist}</p>
                <audio controls className="music-controls">
                    <source src={song.filePath} type="audio/mp3" />
                </audio>
                <div className="options">
                <button value={song.id} onClick={() => likeSong(song.id)}>
                    <i className="fas fa-heart Like song-icon" value={song.id}></i>
                </button>
                <button value={song.id} onClick={() => unLikeSong(song.id)}>
                    <i className="fas fa-heart unLike song-icon" value={song.id}></i>
                </button>
                <button value={song.id} onClick={() => deleteSong(song.id)}>
                    <i className="fas fa-times removeSong song-icon" value={song.id} ></i>
                </button>
                </div>

        </li>))
   }
            </div>
        </>
        )
    }

// Likes:
//  userId
//  songId



    // const song = useSelector((state) => Object.values(state.currentSong));
    // function play(songName){
    //     const song = songs.find(song=>song.name ===songName)
    //     dispatch(currentSongActions.setSong(song))
    //     console.log(song)

    //     // let audio = new Audio("https://lukes-bucket-88.s3.amazonaws.com/Lana+Del+Rey++Summertime+Sadness.mp3")
    // }

    {/* <audio key={song.id} src={song.filePath}>{song.name}</audio> */}
    //TODO make a list/div with song name and anchor with url
    // <button key={song.id} value={song.name} onClick={(e)=>play(e.target.value)}>{song.name}</button>

export default AllSongs;
