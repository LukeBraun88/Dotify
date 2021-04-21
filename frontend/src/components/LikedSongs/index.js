import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect} from 'react'
import * as songActions from "../../store/songs"
import * as likeActions from "../../store/likes"
import * as likesActions from "../../store/likes"
import * as likedSongsActions from "../../store/likedSongs"
import "../AllSongs/AllSongs.css"
import "./LikedSongs.css"
import Song from "../Song"



function LikedSongs() {

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const likedSongs = useSelector((state) => Object.values(state.likedSongs));
    const userId = sessionUser.id

    useEffect(() => {
        // dispatch(songActions.getSongs())
        dispatch(likesActions.getLikes())
        dispatch(likedSongsActions.getLikedSongs(userId))
    }, [])

    function unLikeSong(songId) {
        dispatch(likeActions.deleteLikeStore({ userId, songId }))
        // dispatch(likesActions.getLikes())
        dispatch(likedSongsActions.removeLikedSong(songId))
    }
    function deleteSong(songId) {
        dispatch(songActions.deleteSongStore(songId))
        dispatch(likedSongsActions.getLikedSongs(userId))
    }

    useEffect(()=>{
        var element1 = document.getElementById("songs");
        element1.classList.remove("clicked");
        var element3 = document.getElementById("upload");
        element3.classList.remove("clicked");
        var element2 = document.getElementById("liked");
        element2.classList.add("clicked");
    },[])


    return (
        <>
            <div className="container">
                <div className="music">

                    <div className="all-songs">
                        {likedSongs.map(song =>
                        (<li className="song-lists" key={song.id}>
                            <div className="song-container">
                                <Song songId={song.id} name={song.name} artist={song.artist} filePath={song.filePath} />
                            </div>

                        </li>))
                        }
                    </div>
                </div>

            </div>
        </>
    )
}
export default LikedSongs;
