
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import {UploadSong} from './UploadSong';
import { NavLink } from 'react-router-dom'

export default function UploadSongModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <NavLink to="" className="link" onClick={() => setShowModal(true)}><i class="fas fa-upload"></i>Upload Song</NavLink>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UploadSong />
                </Modal>
            )}
        </>
    );
}
