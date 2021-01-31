import "./MusicBar.css"


export default function MusicBar() {
    return (
        <div className="music-bar">
            <div className="song-info">
                <div className="album-image"></div>
                <div className="song-artist"></div>
            </div>
            <div className="slider"></div>
            <div className="right"></div>
        </div>
    )
}
