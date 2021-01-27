import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import {NavLink} from 'react-router-dom'

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <NavLink to="" className="navlink" onClick={() => setShowModal(true)}>Sign up</NavLink>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;
