

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as songActions from "../../store/songs"

export function UploadSong() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState("");
    const [artist, setArtist] = useState("");
    // const [filePath, setFilePath] = useState("");
    const [songFile, setSongFile] = useState(null);
    const [errors, setErrors] = useState([]);

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = [];
        const userId = sessionUser.id
        return dispatch(songActions.createSong({ name, artist, songFile, userId }))
            .then(() => {
                setName("");
                setArtist("");
                // setFilePath("");
                setSongFile(null);
                // history.push("/")
            })
            .catch((res) => {
                if (res.data && res.data.errors) {
                    newErrors = res.data.errors;
                    setErrors(newErrors);
                }
            });

    };

    // console.log("sessionUser",sessionUser.id)

    //TODO useEffect to getSongs




    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setSongFile(file);
    };

    return (
        <form className="pure-form-stacked login" onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div>Add a Song</div>
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
                <input type="file" onChange={updateFile} />
            </label>
            <button type="submit">Add Song</button>
        </form>
    );
}
