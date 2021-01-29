
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import {UploadSong} from './UploadSong';
import { NavLink } from 'react-router-dom'

function UploadSongModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <NavLink to="" className="navlink" onClick={() => setShowModal(true)}>Upload Song</NavLink>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UploadSong />
                </Modal>
            )}
        </>
    );
}

export default UploadSongModal;
