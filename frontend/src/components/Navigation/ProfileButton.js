import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'
import profileButton from "../../images/profile.png"

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            {/* <div className="button_container"> */}
            <div className="profile-dropdown">
                <p className="profile-list-item">{user.username}</p>
                <button className="dropdown-button" onClick={openMenu}>
                <img src={profileButton} className="circle" />
                </button>
            {showMenu && (
                <div className="profile-list-item">
                            <button className='button-logout' onClick={logout}>Log Out</button>
                        </div>)
}
            </div>
            {/* )} */}
            {/* </div> */}
        </>
    );
}

export default ProfileButton;
