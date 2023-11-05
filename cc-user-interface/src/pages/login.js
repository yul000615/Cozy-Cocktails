import React, { useState, useContext } from 'react';
import AppContext from '../AppContext';
import { Link, useLocation } from 'react-router-dom';
import Modal from 'react-modal';

function ErrorMessages({ error }) {
  if (!error) {
    return null;
  } else {
    return <p className='errorMessage'>{error}</p>;
  }
}

function Login() {
  var emailValidation = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessfulLogin, setIsSuccessfulLogin] = useState(false);
  const context = useContext(AppContext);
  const location = useLocation(); // Get the current location
  const [modalOpen, setModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  async function loginClick() {
    // Validate user input
    if (!isInputValid()) {
      setError('All values must be filled');
      return;
    }

    // Send a POST request to the backend for login
    try {
      const response = await fetch("https://localhost:7268/api/Authentication/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        context.setAccessToken(data.accessToken);
        setIsSuccessfulLogin(true);
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (error) {
      setError("Network error occurred.");
    }
  }

  function isInputValid() {
    const isEmailEmpty = email.length === 0;
    const isPasswordEmpty = password.length === 0;
    return (isEmailEmpty || isPasswordEmpty) ? false : true;
  }

  function closeModal() {
    setModalOpen(false);
    setResetEmail('');
    setResetMessage('');
  }

  function openModal(e) {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    setModalOpen(true);
  }

  function resetSubmit(){
    if (!emailValidation.test(resetEmail)) {
      setResetMessage('Please enter a valid email address');
    } else{
      setResetMessage('Email sent! Check your email for further instruction.')
    }
  }

  return (
    <div className="LoginPage">
      {isSuccessfulLogin ? (
        <div className="LoggedInHomePage">
          <h1>Welcome Back!</h1>
          <Link to={location.pathname === '/home2' ? '/myAccount' : '/home2'}>
            {location.pathname === '/home2' ? 'My Account' : 'Homepage 2'}
          </Link>
        </div>
      ) : (
        <div className="LoginWelcome">
          <h1>Enter your email and password</h1>
        </div>
      )}
      {!isSuccessfulLogin && (
        <div className="LoginFields">
          <ErrorMessages error={error} />
          <label className="entryField">
            Email: <input type="email" name="userEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label className="entryField">
            Password: <input type="password" name="userPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <div className="remember-forgot">
            <a href='#' onClick={openModal}>Forgot Password?</a>
          </div>
          <button className='registerBtn' onClick={loginClick}>Submit</button>
          <Modal size="md" isOpen={modalOpen} onRequestClose={closeModal} className="Modal" backdrop="static" maskClosable={false} shouldCloseOnOverlayClick={false}>
            {
              <div className='ResetModal'>
                <h1>Enter your email below:</h1>
                <input type="resetEmail" name="resetEmail" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
                <button onClick={resetSubmit}>Submit</button>
                <p>{resetMessage}</p>
              </div>
            }
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Login;