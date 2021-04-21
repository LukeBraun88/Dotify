import "./MusicBar.css"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {useSelector} from 'react-redux'

const Player = () => {
    const songFile = useSelector((state) => state.currentSong.filePath);

    return (
        <AudioPlayer
        autoPlay
        src={songFile}
        onPlay={e => console.log("onPlay")}
        // other props here
    />
    )
}


export default function MusicBar() {
    const artist = useSelector((state) => state.currentSong.artist);
    const title = useSelector((state) => state.currentSong.name);
    return (
        <div className="music-bar">
            {/* <div className="song-info">
                <div className="album-image"></div>
                <div className="song-artist"></div> */}
                <div className="song_info">
                    <p className="title_musicBar">{title}</p>
                    <p className="artist_musicBar">{artist}</p>
                </div>
                <div className="audio-player">
                <Player />
            </div>
            </div>

        // </div>
    )
}
