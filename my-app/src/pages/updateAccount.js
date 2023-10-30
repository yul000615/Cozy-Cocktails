import './updateAccount.css';
import React, { useState } from 'react';

export default function UpdateAccount() {
    function ErrorMessages({ error }) {
        if (!error) {
            return null;
        } else {
            return <p className='errorMessage'>{error}</p>;
        }
    }

    var passwordMismatch = false;

    const [currentPassword, setCurrentPassword] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');

    const [passwordCorrect, setPasswordCorrect] = useState(false);

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    function verifySubmit() {
        fetch('https://localhost:7268/api/Authentication/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: currentEmail,
                password: currentPassword,
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    setUpdateModalOpen(true); // Set updateModalOpen to true when verification is successful
                    return response.json();
                } else if (response.status === 401) {
                    setError('Invalid email or password');
                    throw new Error('Unauthorized');
                } else {
                    setError('An error occurred while verifying credentials');
                    throw new Error('Verification Error');
                }
            })
            .then((data) => {
                setPasswordCorrect(true);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function toggleModal() {
        setModalOpen(!modalOpen);
    }

    function updateSubmit() {
        var hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        var hasNumber = /\d/;
        var hasAt = /@/;
        var noErrors = true;

    if (email.length > 0){
                if (!hasAt.test(email)){
                setError('Must be a proper email');
                noErrors = false;
            } else {
                setError('');
            }
        }

        if (newPassword.length > 0 && noErrors){
            if (newPassword.length >= 64) {
                setError('Password must be less than 64 characters');
                noErrors = false;
            } else if (!hasSpecial.test(newPassword) || !hasNumber.test(newPassword)) {
                setError('Password must contain a special character and a number');
                noErrors = false;
            }
            else {
                setError('');
            }
        }

        if (noErrors) {
            setModalOpen(true);
        }
    }

    if (updateModalOpen) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    if (modalOpen) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    return (
        <>
            <div className="updatePage">
                <h1 className='welcomeHeader'>Update Your Account</h1>
                <ErrorMessages error={error} />
                <div className='entryFields'>
                    <label htmlFor="currentPassword" hidden={passwordCorrect}>
                        Enter email: <input name="email" value={currentEmail} onChange={(e) => setCurrentEmail(e.target.value)}
                        type="currentEmail" id="currentEmail" />
                        <br />
                        Enter password: <input name="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                        type="currentPassword" id="currentPassword" />
                        <br />
                        <button className="submitButton" onClick={verifySubmit}>Submit</button>
                    </label>
    
                    {updateModalOpen && (
                        <div className="update-popup">
                            <div className="overlay" onClick={toggleModal}></div>
                            <div className="content">
                                <label htmlFor="newEmail">New email: </label>
                                <input
                                    name="newEmail"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    type="email"
                                    id="newEmail"
                                />
                                <br />
                                <label htmlFor="newPassword">New password: </label>
                                <input
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    type="password"
                                    id="newPassword"
                                />
                                <br />
                                <button className="updateButton" onClick={updateSubmit}>
                                    Update
                                </button>
                                <button className="close-modal" onClick={toggleModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
    
                    {modalOpen && (
                        <div className="popup">
                            <div className="overlay" onClick={toggleModal}></div>
                            <div className="content">
                                <h1>Updated Successfully!</h1>
                                <button className="close-modal" onClick={toggleModal}>Close</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
} 
