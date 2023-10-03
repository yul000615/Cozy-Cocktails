import './signup.css';
import { useState } from 'react';

function ErrorMessages({ error }) {
  if (error.length === 0) {
    return null;
  } else {
    return <p className='errorMessage'>{error}</p>;
  }
}

function SignUp() {
  const [error, setError] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [existingEmail, setExistingEmail] = useState(true);

  async function registerClick() {
    var hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var hasNumber = /\d/;

    if (first.length === 0 || last.length === 0 || email.length === 0 || password.length === 0) {
      setError('All values must be filled');
    } else if (password.length >= 64) {
      setError('Password must be less than 64 characters');
    } else if (!hasSpecial.test(password) || !hasNumber.test(password)) {
      setError('Password must contain a special character and a number');
    } else if (existingEmail) {
      setError('Email is already linked to an account');
    } else {
      setError('');

      // Prepare user data
      const userData = {
        username: `${first} ${last}`,
        email: email,
        password: password,
      };

      try {
        // Send the user data to the backend for registration
        const response = await fetch('/api/account/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          // Registration successful, you can redirect the user to a success page or perform other actions
          window.location.href = '/success';
        } else {
          const responseText = await response.text();
          setError(`Registration failed: ${responseText}`);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        setError('Registration failed. Please try again later.');
      }
    }
  }

  return (
    <div className='SignUpPage'>
      <div className='SignUpWelcome'>
        <h1>Welcome To</h1>
        <h1>Cozy Cocktails!</h1>
      </div>
      <ErrorMessages error={error} />
      <div className='SignUpFields'>
        <label className='entryField'>
          First Name: <input name='userFirstName' value={first} onChange={(e) => setFirst(e.target.value)} />
        </label>
        <br />
        <label className='entryField'>
          Last Name: <input name='userLastName' value={last} onChange={(e) => setLast(e.target.value)} />
        </label>
        <br />
        <label className='entryField'>
          Email: <input name='userEmail' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label className='entryField'>
          Password: <input name='userPassword' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button className='registerBtn' onClick={registerClick}>
          Register
        </button>
      </div>
    </div>
  );
}

export default SignUp;
