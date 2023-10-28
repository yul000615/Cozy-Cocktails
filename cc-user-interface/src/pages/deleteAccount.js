import "./deleteAccount.css";
import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function DeleteAccount() {
    const [modalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function toggleModal() {
        setModalOpen(!modalOpen);
    }

    return (
        <div>
            <button className="myAccountButton" onClick={toggleModal}>Delete My Account</button>
            <Modal className="modal" isOpen={modalOpen}>
                <p>Please reenter your credentials.</p>
                <div>
                    <label htmlFor="email">Email</label>
                    <input name="email" onChange={(e) => setEmail(e.target.value)} type="email" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" />
                </div>
                <div className="buttonGroup">
                    <button className="modalBtn">Submit</button>
                    <button className="modalBtn" onClick={toggleModal}>Cancel</button>
                </div>
            </Modal>
    
        </div>
    )
}
export default DeleteAccount;