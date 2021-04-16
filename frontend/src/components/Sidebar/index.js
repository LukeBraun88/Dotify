import "./Sidebar.css"
import { NavLink } from 'react-router-dom'

import UploadSongModal from "../UploadSongModal"

export default function Sidebar() {

    // function clickedSongs() {
    //     var element1 = document.getElementById("liked");
    //     element1.classList.remove("clicked");
    //     var element2 = document.getElementById("songs");
    //     element2.classList.add("clicked");
    // }

    function clickedLiked() {
        var element3 = document.getElementById("songs");
        element3.classList.remove("clicked");
        var element3 = document.getElementById("upload");
        element3.classList.remove("clicked");
        var element4 = document.getElementById("liked");
        element4.classList.add("clicked");
    }

    // function clickedLike() {
    //     var element = document.getElementById("songs");
    //     element.classList.add("clicked");
    // }

    const handleClick = event => event.target.classList.add('clicked');

    return (
        <div className="sidebar">
            <div className="sidebar-logo">Dotify</div>
            <ul className="sidebar-links">
                <li><NavLink to="/" id='songs' onClick={handleClick} className="link"><i className="fas fa-home"></i>All Songs</NavLink ></li>
                {/* <li><NavLink to="" className="link"><i className="fas fa-search"></i>Search</NavLink></li> */}
                <li><NavLink to="/liked" id='liked' onClick={clickedLiked} className="link"><i onClick={clickedLiked} className="fas fa-book-open"></i>Liked Songs</NavLink></li>
                <li><UploadSongModal /></li>

            </ul>
            <div className="seperator"></div>
        </div>
    )
}
