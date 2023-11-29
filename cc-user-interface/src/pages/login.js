import React, { useState, useContext } from 'react';
import AppContext from '../AppContext';
import { Link, useLocation } from 'react-router-dom';
import "./login.css"

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
          <button className='registerBtn' onClick={loginClick}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default Login;