
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as songActions from "../../store/songs"
import { useEffect } from 'react'

export function UploadSong({ showModal, setShowModal }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState("");
    const [artist, setArtist] = useState("");
    const [songFile, setSongFile] = useState(null);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = async(e) => {
        e.preventDefault();
        let newErrors = [];
        const userId = sessionUser.id
        try {
            await setLoading(true)
            await dispatch(songActions.createSong({ name, artist, songFile, userId }))
            await setName("");
            await setArtist("");
            await setSongFile(null);
            await history.push("/")
            await setShowModal(false)

        } catch (errors) {
            setErrors(errors);
            console.log("errors", errors)
        }

    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setSongFile(file);
    };


    useEffect(() => {
        var element3 = document.getElementById("upload");
        element3.classList.add("clicked");
    }, [])

    return (
        <div className="song-add-container">


            <form className="song-add pure-form-stacked" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <h2 className="add-song-title">Add a Song</h2>
                <label>
                    Song Name
        <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Artist
        <input
                        type="text"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input className="file" type="file" onChange={updateFile} />
                </label>
                {!loading ? <button className="addSong-button" type="submit">Add Song</button>:
                <div className="loader"></div>
                }


            </form>
            <div className="space" ></div>
        </div>
    );
}
