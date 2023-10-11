import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link, useLocation } from 'react-router-dom';

function ErrorMessages({ error }) {
  if (!error) {
    return null;
  } else {
    return <p className='errorMessage'>{error}</p>;
  }
}

function Login() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isSuccessfulLogin, setIsSuccessfulLogin] = useState(false);

  const location = useLocation(); // Get the current location

  async function loginClick() {
    // Validate user input
    if (email.length === 0 || password.length === 0) {
      setError('All values must be filled');
      return;
    }

    setError('');

    // Check for the exception
    if (email === "abc@gmail.com" && password === "abc1!") {
      setIsSuccessfulLogin(true);
      return;
    }

    // Send a POST request to the backend for login
    try {
      const response = await fetch("/cc-api/Controllers/AuthericationController", {
        method: "POST",
        headers: {
          "Content-type": "application.json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Handle success (e.g., set a flag for successful login)
        setIsSuccessfulLogin(true);
      } else {
        // Handle errors (e.g., display an error message)
        const data = await response.json();
        setError(data.error || "Invalid credentials");
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error);
      setError("Network error occurred.");
    }
  }

  function closeModal() {
    setModalOpen(false);
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
            Email: <input name="userEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label className="entryField">
            Password: <input name="userPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <div className="remember-forgot">
            <a href="#">Forgot Password?</a>
          </div>
          <button className='registerBtn' onClick={loginClick}>Submit</button>
          <Modal isOpen={modalOpen} onRequestClose={closeModal} className="Modal">
            {isSuccessfulLogin ? (
              <div>
                <h2>Login Successful!</h2>
                <br />
                <Link to={location.pathname === '/home2' ? '/myAccount' : '/home2'}>
                  {location.pathname === '/home2' ? 'My Account' : 'Homepage 2'}
                </Link>
              </div>
            ) : (
              <h2>Login Error</h2>
            )}
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Login;