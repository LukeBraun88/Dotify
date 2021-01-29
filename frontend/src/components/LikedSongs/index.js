import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import * as songActions from "../../store/songs"
import * as currentSongActions from "../../store/currentSong"
import { NavLink } from 'react-router-dom'



function LikedSongs() {

    const dispatch = useDispatch();
const [loaded,setLoaded] = useState(false)
    //we are getting my current songs state
    const songs = useSelector((state) => Object.values(state.songs));

    // when the page is loaded, my songs are updated
    useEffect(() => {
        dispatch(songActions.getSongs())
        setLoaded(true)
    }, [])






    console.log("songs:", songs)
    return (
        <>
            <div className="all-songs">Songs:
        { loaded && songs.map(song =>
                <li>
                    <h2>{song.name}</h2>
                    <audio controls className="music-controls">
                        <source src={song.filePath} type="audio/mp3" />
                    </audio>
                </li>
            )}
            </div>
        </>
    )
}


export default LikedSongs;
