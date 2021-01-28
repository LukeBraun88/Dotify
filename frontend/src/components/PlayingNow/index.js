// import './PlayingNow.css'
// import {useState, useEffect} from 'react'
// import * as currentSongActions from "../../store/currentSong"


// export default function PlayingNow() {
//     const { play, setPlay } = useState(false)
//     const { pause, setPause } = useState(true)
//     const { url, setUrl } = useState('')


//     useEffect(() => {
//         const song = currentSongActions.getSong()
//         let audio = new Audio(song.filePath)
//     }, [])



//     function playMusic() {
//         setPlay(true)
//         setPause(false)
//         audio.playMusic(audio)
//     }
//     function pauseMusic() {
//         setPlay(false)
//         setPause(true)
//         audio.pauseMusic(audio)
//     }

//     return (
//         <div className="show-music">
//             <div className="music-info">testing</div>
//             <div className="play-song">
//                 <button onClick={()=>playMusic()} className="play-button">
//                     <i class="fas fa-play"></i>
//                 </button>
//                 <i class="fas fa-ellipsis-h delete-button"></i>
//             </div>
//             <div className="songs">
//                 <li>song 1</li>
//             </div>
//         </div>
//     )
// }
