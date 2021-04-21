import "./MusicBar.css"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {useSelector} from 'react-redux'

const Player = () => {
    const song = useSelector((state) => Object.values(state.currentSong));

    return (
    <AudioPlayer
        autoPlay
        src={song}
        onPlay={e => console.log("onPlay")}
    // other props here
    />
    )
}


export default function MusicBar() {
    return (
        <div className="music-bar">
            {/* <div className="song-info">
                <div className="album-image"></div>
                <div className="song-artist"></div> */}
                <div className="song_info"></div>
                <div className="audio-player">
                <Player />
            </div>
            </div>

        // </div>
    )
}
