import "./Sidebar.css"
import { NavLink } from 'react-router-dom'

export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebar-logo">Dotify</div>
            <ul className="sidebar-links">
                <li><NavLink to="/"><i class="fas fa-home"></i>Home</NavLink></li>
                <li><NavLink to="/"><i class="fas fa-search"></i>Search</NavLink></li>
                <li><NavLink to="/"><i class="fas fa-book-open"></i>Library</NavLink></li>
            </ul>
            <div className="seperator"></div>
        </div>
    )
}
