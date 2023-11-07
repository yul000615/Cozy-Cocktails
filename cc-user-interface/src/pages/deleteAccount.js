import "./deleteAccount.css";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");


export default function DeleteAccount() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const [isAccountDeleted, setIsAccountDeleted] = useState(false);

    function openModal() {
        setError("");
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setIsValidated(false);
    }
    
    function validateCredentials() {
        if (email === "pass") {
            setIsValidated(true);
        } else {
            setError("Invalid credentials.")
        }
    }

    function deleteAccountRequest() {
        setIsAccountDeleted(true);
        closeModal();
    }

    return (
        <div>
            <button className="myAccountButton" onClick={openModal}>Delete My Account</button>
            <Modal className="modal" isOpen={modalOpen}>
                {isAccountDeleted ? (<DeleteSuccess/>) : 
                (<div>
                    {isValidated ? (<p>Are you sure? This action cannot be undone.</p>) : 
                        (<CredentialFields setEmail={setEmail} setPassword={setPassword} error={error}/>)}
                    <div className="buttonGroup">
                    {isValidated ?
                        (<button className="modalBtn" onClick={deleteAccountRequest}>Delete Account</button>) : 
                        (<button className="modalBtn" onClick={validateCredentials}>Submit</button>)}
                        <button className="modalBtn" onClick={closeModal}>Cancel</button>
                    </div>
                </div>)
                
                }
            </Modal>
        </div>
    )
};


function CredentialFields({setEmail, setPassword, error}) {
    return (
        <div>
            <p>Please reenter your credentials.</p>
            <ErrorMessage error = {error}/>
            <div>
                <label htmlFor="email">Email</label>
                <input name="email" onChange={(e) => setEmail(e.target.value)} type="email" id="email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input name="password" onChange={(e) => setPassword(e.target.value)} type="password" id="password" />
            </div>
        </div>
    )
}

function ErrorMessage({error}) {
    if (!error) {
      return null;
    } else {
      return <p className='errorMessage'>{error}</p>;
    }
}

function DeleteSuccess() {
    return (
        <div>
            <p>Account deletion successful. Sending back to home page...</p>
            <Navigate replace to="/"/>
        </div>
    )
}