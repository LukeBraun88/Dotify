import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {useEffect, useState} from 'react'
import * as songActions from "../../store/songs"
import * as likeActions from "../../store/likes"
import * as currentSongActions from "../../store/currentSong"
import "./AllSongs.css"
import {NavLink} from 'react-router-dom'



 function AllSongs(){

    const dispatch = useDispatch();

    //we are getting my current songs state
    const songs = useSelector((state) => Object.values(state.songs));

    // when the page is loaded, my songs are updated
    useEffect(() => {
        dispatch(songActions.getSongs())
    }, [])

    const [likes,setLikes] = useState([])

    function likeSong(songId){
        let newErrors = [];
        const userId = sessionUser.id
        return dispatch(likeActions.createLike({ userId, songId }))
    }

    console.log("songs:",songs)
    return(
        <>
        <div className="all-songs">Songs:
        {songs.map(song=>
        <li>
                <h2>{song.name}</h2>
                <audio controls className="music-controls">
                    <source src={song.filePath} type="audio/mp3" />
                </audio>
                <button value={song.id} onClick={(e)=>likeSong(e.target.value)}>
                    <i class="fas fa-heart"></i>
                </button>
        </li>
            )}
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
