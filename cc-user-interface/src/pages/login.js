import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

function ErrorMessages({ error }) {
  if (!error) {
    return null;
  } else {
    return <p className='errorMessage'>{error}</p>;
  }
}

function Login() {
  const [error, setError] = useState('');
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  async function registerClick() {
    var hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var hasNumber = /\d/;

    if (email.length === 0 || password.length === 0) {
      setError('All values must be filled');
    } else if (password.length >= 64) {
      setError('Password must be less than 64 characters');
    } else if (!hasSpecial.test(password) || !hasNumber.test(password)) {
      setError('Password must contain a special character and a number');
    } else {
      setError('');
    }
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div className="LoginPage">
      <div className="LoginWelcome">
        <h1>Welcome Back</h1>
      </div>
      <ErrorMessages error={error || apiError} />
      <div className="LoginFields">
        <label className="entryField">
          Email: <input name="userEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label className="entryField">
          Password: <input name="userPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <div class="remember-forgot">
          <a href="#">Forgot Password?</a>
        </div>
        <button className='registerBtn' onClick={registerClick}>Login</button>
        <Modal isOpen={modalOpen} onRequestClose={closeModal} className="Modal">
          {apiSuccess ? (
            <div>
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

export default Login;
