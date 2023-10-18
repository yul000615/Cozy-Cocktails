import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import './signup.css'

Modal.setAppElement('#root');

function ErrorMessages({ error }) {
  if (!error) {
    return null;
  } else {
    return <p className='errorMessage'>{error}</p>;
  }
}

export const SignUp = (props) =>{
  const [error, setError] = useState('');
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(false);
  
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [existingEmail, setExistingEmail] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);


  const formData = {
    email,
    password,
  };

  const registerClick = async (e) => {
    e.preventDefault();
    console.log("Email: ", email);
    console.log("Password: ", password);

    var hasAt = /@/;
    var hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var hasNumber = /\d/;

    if (first.length === 0 || last.length === 0 || email.length === 0 || password.length === 0) {
      setError('All values must be filled');
    } else if (!hasAt.test(email)) {
      setError('Enter a proper email');
    } else if (password.length >= 64) {
      setError('Password must be less than 64 characters');
    } else if (!hasSpecial.test(password) || !hasNumber.test(password)) {
      setError('Password must contain a special character and a number');
    } else if (existingEmail) {
      setError('Email is already linked to an account');
    } else {
      setError('');

      try {
        const response = await fetch("/api/Account/register", {
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
          const data = await response.json();
          setApiError(data.error || "An error occurred during registration.");
        }
      } catch (error) {
        console.error("Network error:", error);
        setApiError("Network error occurred.");
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
        <label htmlFor="name" className="entryField"></label>
          First Name: <input name="first" value={first} onChange={(e) => setFirst(e.target.value)} 
          type="first" id="first" />
        <br />
        <label htmlFor="name" className="entryField"></label>
          Last Name: <input name="last" value={last} onChange={(e) => setLast(e.target.value)} 
          type="last" id="last" />
        <br />
        <label htmlFor="email" className="entryField"></label>
          Email: <input name="email" onChange={(e) => setEmail(e.target.value)} 
          type="email" id="email" />
        <br />
        <label htmlFor="password" className="entryField"></label>
          Password: <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} 
          type="password" id="password" />
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
