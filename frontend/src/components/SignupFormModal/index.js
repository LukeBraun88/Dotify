import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import { NavLink } from 'react-router-dom'
import "./SignupForm.css"

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <NavLink to="" className="navlink" onClick={() => setShowModal(true)}>Sign up</NavLink>
            {showModal && (
                <Modal className="signup-modal" onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </>
    );
}

export default SignupFormModal;
