import "./HomeNavBar.css"
import {useSelector} from "react-redux"
import ProfileButton from "../Navigation/ProfileButton"
export default function HomeNavBar({}) {
    const sessionUser = useSelector(state => state.session.user);
    console.log(sessionUser)
    return (
        <div className="navbar" >
            <div className="left-nav">
                Dotify
            </div>
            <div className="right-nav">
                <div className="nav-dropdown">
                    {/* <h3 className="userName">name</h3> */}
                    <ProfileButton user={sessionUser} />
                    <i class="fas fa-caret-down"></i>
                </div>
            </div>
        </div >
    )
}
