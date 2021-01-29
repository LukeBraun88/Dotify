import "./HomePage.css"
import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import PlayingNow from "../PlayingNow";
import MusicBar from "../MusicBar";
import Sidebar from "../Sidebar"
import Navigation from "../Navigation"
import AllSongs from "../AllSongs"



function HomePage() {
    return (
        <>
            <div className="container">
                <Sidebar />
                <div class="music">
                        <AllSongs />
                </div>
                <MusicBar />
            </div>
        </>
    )
}

export default HomePage;
