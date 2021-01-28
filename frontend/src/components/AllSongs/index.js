import { useSelector, useDispatch } from 'react-redux';
import {useEffect} from 'react'
import * as songActions from "../../store/songs"
import "./AllSongs.css"



export default function AllSongs(){

    const dispatch = useDispatch();

    //we are getting my current state
    const songs = useSelector((state) => state.songs);

    // when the page is loaded, my songs are updated
    useEffect(() => {
        dispatch(songActions.getSongs())
        // console.log("useEffect ran")
    }, [])

    // const songList = songs.forEach(song=>{Object.values(song)})

    // console.log(songs.map((song)=>Object.values(song)))
    // console.log("songs-------",songs)
    return(
        <>
        <div className="all-songs">Songs:</div>
        {/* {songs[0].map(song=>song.name)} */}
        </>
    )
}
