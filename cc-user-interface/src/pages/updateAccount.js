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
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    function passwordSubmit() {
        //call into database and check password
        passwordMismatch = false;

    if (passwordMismatch){
                setError('password incorrect');
        } else {
            setError('');
            setPasswordCorrect(true);
        }
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
                        Enter password: <input name="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                        type="currentPassword" id="currentPassword" />
                        <button className="submitButton" onClick={passwordSubmit}>Submit</button>
                    </label>
                    <label htmlFor="email" hidden={!passwordCorrect}>
                        New email: <input name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        type="email" id="email" />
                    </label>
                    <br />
                    <label htmlFor="newPassword" hidden={!passwordCorrect}>
                        New password: <input name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                        type="newPassword" id="newPassword" />
                        <br />
                        <button className="submitButton" onClick={updateSubmit}>Update</button>
                    </label>

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
