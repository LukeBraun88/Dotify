import './PlayingNow.css'


export default function PlayingNow() {
    return (
        <div className="show-music">
            <div className="music-info">testing</div>
            <div className="play-song">
                <button className="play-button">
                    <i class="fas fa-play"></i>
                </button>
                <i class="fas fa-ellipsis-h delete-button"></i>
            </div>
            <div className="songs">
                <li>song 1</li>
            </div>
        </div>
    )
}
