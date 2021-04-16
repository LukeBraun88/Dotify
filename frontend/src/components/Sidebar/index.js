import "./Sidebar.css"
import { NavLink } from 'react-router-dom'

import UploadSongModal from "../UploadSongModal"

export default function Sidebar() {

    return (
        <div className="sidebar">
            <div className="sidebar-logo">Dotify</div>
            <ul className="sidebar-links">
                <li><NavLink to="/" className="link"><i className="fas fa-home"></i>Home</NavLink ></li>
                <li><NavLink to="" className="link"><i className="fas fa-search"></i>Search</NavLink></li>
                <li><NavLink to="/liked" className="link"><i className="fas fa-book-open"></i>Liked Songs</NavLink></li>
                <li><UploadSongModal /></li>

            </ul>
            <div className="seperator"></div>
        </div>
    )
}
