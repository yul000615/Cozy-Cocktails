import './updateAccount.css';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

function ErrorMessages({ error }) {
  if (!error) {
    return null;
  } else {
    return <p className='errorMessage'>{error}</p>;
  }
}

export const UpdateAccount = (props) => {
    const [error, setError] = useState('');
    const [apiError, setApiError] = useState(null);
    const [apiSuccess, setApiSuccess] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [email, setEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const registerClick = async (e) => {
        e.preventDefault();
    
        var emailValidation = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        var passwordValidation = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*\d).*$/;
    
        if (email.length === 0 || newEmail.length === 0 || newPassword.length === 0) {
          setError('All values must be filled');
        } else if (!emailValidation.test(email) || !emailValidation.test(newEmail)) {
          setError('Please enter a valid email address');
        } else if (newPassword.length > 64) {
          setError('Password must be less than 64 characters');
        } else if (!passwordValidation.test(newPassword)) {
          setError('Password must contain a special character and a number');
        } else {
          setError('');
    
          try {
            const response = await fetch("https://localhost:7268/api/Account/update", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email,
                newEmail: newEmail,
                newPassword: newPassword
              }),
            });
            console.log(response);
            if (!response.ok) {
              const errorMessage = `HTTP error! Status: ${response.status}`;
              const errorResponse = await response.text(); 
              console.error(errorMessage, errorResponse); 
              setError(errorResponse);
            } else {
              const responseData = await response.text();
              console.log("Response Data:", responseData);
              setApiSuccess(true);
              setModalOpen(true);
            }
          } catch (error) {
            console.error('Error during fetch:', error);
            setApiError(error.message);
            setModalOpen(true);
          }
        };
      }
    
      function closeModal() {
        setModalOpen(false);
      }

    return (
        <div className="UpdateAccountPage">
          <div className="UpdateAccountWelcome">
            <h1>Update Account</h1>
          </div>
          <ErrorMessages error={error || apiError} />
          
          <div className="UpdateFields">
            <label htmlFor="email" className="entryField"></label>
              Current Email: <input name="email" onChange={(e) => setEmail(e.target.value)} 
              type="email" id="email" />
            <br />
            <label htmlFor="newEmail" className="entryField"></label>
              New Email: <input name="newEmail" onChange={(e) => setNewEmail(e.target.value)} 
              type="email" id="newEmail" />
            <br />
            <label htmlFor="newPassword" className="entryField"></label>
              New Password: <input name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} 
              type="password" id="newPassword" />
            <br />
            <button className='registerBtn' onClick={registerClick}>Update</button>
            <Modal isOpen={modalOpen} onRequestClose={closeModal} className="Modal">
              {apiSuccess ? (
                <div>
                  <h2>Account Updated Successfully!</h2>
                  <br />
                  <Link to="/"><button onClick={closeModal}>Please Login Again</button></Link>
                </div>
              ) : (
                <ErrorMessages error={error || apiError} />
              )}
            </Modal>
          </div>
        </div>
      );
    }

export default UpdateAccount;
