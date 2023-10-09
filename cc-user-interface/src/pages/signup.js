import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import './signup.css'

function ErrorMessages({ error }) {
  if (!error) {
    return null;
  } else {
    return <p className='errorMessage'>{error}</p>;
  }
}

function SignUp() {
  const [error, setError] = useState('');
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(false);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [existingEmail, setExistingEmail] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  async function registerClick() {
    var hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var hasNumber = /\d/;

    if (first.length === 0 || last.length === 0 || email.length === 0 || password.length === 0) {
      setError('All values must be filled');
    } else if (password.length >= 64) {
      setError('Password must be less than 64 characters');
    } else if (!hasSpecial.test(password) || !hasNumber.test(password)) {
      setError('Password must contain a special character and a number');
    } else {
       // Sending fetch request to connect frontend and backend
       const formData = {
         email,
         password,
         first,
         last
         // Include other relevant fields in formData
       };
 
       try {
         const response = await fetch("https://localhost:7268/api/Account/register", {
           method: "POST",
           headers: {
             "Content-type": "application/json",
           },
           body: JSON.stringify(formData),
         });
 
         if (response.ok) {
           // Handle success
           setApiSuccess(true);
           setModalOpen(true);
         } else {
           // Handle errors
           console.log(response)
           const data = await response.json();
           setApiError(data.error || "An error occurred during registration.");
         }
       } catch (error) {
         // Handle network errors
         console.error("Network error:", error);
         setApiError("Network error occurred.");
       }
 
       if (existingEmail) {
         setError('Email is already linked to an account');
       } else {
         setError('');
    }
    }
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div className="SignUpPage">
      <div className="SignUpWelcome">
        <h1>Welcome To</h1>
        <h1>Cozy Cocktails!</h1>
      </div>
      <ErrorMessages error={error || apiError} />
      <div className="SignUpFields">
        <label className="entryField">
          First Name: <input name="userFirstName" value={first} onChange={(e) => setFirst(e.target.value)} />
        </label>
        <br />
        <label className="entryField">
          Last Name: <input name="userLastName" value={last} onChange={(e) => setLast(e.target.value)} />
        </label>
        <br />
        <label className="entryField">
          Email: <input name="userEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label className="entryField">
          Password: <input name="userPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button className='registerBtn' onClick={registerClick}>Register</button>
        <Modal isOpen={modalOpen} onRequestClose={closeModal} className="Modal">
          {apiSuccess ? (
            <div>
              <h2>Account Creation Successful!</h2>
              <br />
              <Link to="/"><button onClick={closeModal}>Head to home page</button></Link>
            </div>
          ) : (
            <h2>Registration Error</h2>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default SignUp;
