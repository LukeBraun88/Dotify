import "./HomePage.css"
import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import PlayingNow from "../PlayingNow";
import MusicBar from "../MusicBar";
import HomeNavBar from "../HomeNavBar";
import Sidebar from "../Sidebar"

function HomePage() {
    return (
        <>
            <div className="container">
                <Sidebar />
                <div class="music">
                        <HomeNavBar />
                        <PlayingNow />
                </div>
                <MusicBar />
            </div>
        </>
    )
}

export default HomePage;
