import "./SongLiked.css"
import { useSelector, useDispatch} from 'react-redux'
import pauseIcon from "../../images/pause.png"
import playIcon from "../../images/play.png"
import likeIcon from "../../images/like.png"
import unLikeIcon from "../../images/unLike.png"
import deleteIcon from "../../images/delete.png"
import {useState} from "react"
import * as songActions from "../../store/songs"
import * as likeActions from "../../store/likes"
import * as currentSongActions from "../../store/currentSong"
import * as likesActions from "../../store/likes"
import * as likedSongsActions from "../../store/likedSongs"




export default function SongLiked({songId, name, artist, filePath}) {

    const dispatch = useDispatch();

    const songs = useSelector((state) => Object.values(state.songs));
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id

    const [playing, setPlaying] = useState(false)

    const playSong = () => {
        // setPlaying(true)
        dispatch(currentSongActions.setSong({ songId, name, artist, filePath }))
    }

    const pauseSong = () => {
        setPlaying(false)
    }

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


    return(
        <div>
            <div className='container'>
                <div className="rectangle">
                    {/* {playing ?
                    <img className="pause" onClick={()=> pauseSong(songId)} src={pauseIcon} />
                    : */}
                    <img className="play" onClick={()=> playSong()} src={playIcon} />
                {/* } */}
                    <p className="song-title">{name}</p>
                    <p className="song-artist">{artist}</p>
                    <img className="unLike" onClick={()=> unLikeSong(songId)} src={unLikeIcon} />
                    <img className="delete" onClick={()=> deleteSong(songId)} src={deleteIcon} />
                </div>
            </div>
        </div>
    )
    }
