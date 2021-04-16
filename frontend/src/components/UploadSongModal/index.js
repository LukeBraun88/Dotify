
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { UploadSong } from './UploadSong';
import { NavLink } from 'react-router-dom'
import "./UploadSongForm.css"

export default function UploadSongModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <span className="link" onClick={() => setShowModal(true)}><i className="fas fa-upload"></i>Upload Song</span>
            {showModal && (
                <Modal className="add-song-modal" onClose={() => setShowModal(false)}>
                    <UploadSong />
                </Modal>
            )}
        </>
    );
}
