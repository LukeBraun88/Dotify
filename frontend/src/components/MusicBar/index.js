import "./MusicBar.css"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = () => (
    <AudioPlayer
        autoPlay
        src="http://example.com/audio.mp3"
        onPlay={e => console.log("onPlay")}
    // other props here
    />
);


export default function MusicBar() {
    return (
        <div className="music-bar">
            {/* <div className="song-info">
                <div className="album-image"></div>
                <div className="song-artist"></div> */}
                <div className="audio-player">
                <Player />
            </div>
            </div>

        // </div>
    )
}
