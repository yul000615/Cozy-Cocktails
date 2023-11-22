import "./deleteAccount.css";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Modal from "react-modal";
import AppContext from "../AppContext";

Modal.setAppElement("#root");


export default function DeleteAccount() {
    const context = useContext(AppContext);
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
    
    async function validateCredentials() {
        try {
            const response = await fetch("https://localhost:7268/api/Account/verify", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${context.token}`
              },
              body: JSON.stringify({ email, password }),
            }); 
            if (response.ok) {
                setIsValidated(true);
            } else {
                setError("Invalid credentials.")
            }
        } catch (error) {
        setError("Network error occured.")
        }
    }

    async function deleteAccountRequest() {
        try {
            const logoutSuccessful = await context.logout();
            if (logoutSuccessful) {
                const response = await fetch("https://localhost:7268/api/Account/delete", {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${context.token}`
                },
                }); 
                if (response.ok) {
                    setIsAccountDeleted(true);
                }
            }
        } catch (error) {
            setError("Network error occured.")
        }
    }

    return (
        <div>
            <button className="deleteAccountButton" onClick={openModal}>Delete My Account</button>
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