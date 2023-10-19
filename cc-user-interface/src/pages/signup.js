const React = require('react');
const { useState } = require('react');
const Modal = require('react-modal');
const { Link } = require('react-router-dom');
require('./signup.css');

Modal.setAppElement('#root');

function ErrorMessages({ error }) {
  if (!error) {
    return null;
  } else {
    return <p className='errorMessage'>{error}</p>;
  }
}

export const SignUp = (props) => {
  const [error, setError] = useState('');
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(false);
  
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [existingEmail, setExistingEmail] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const registerClick = async (e) => {
    e.preventDefault();
    console.log("Email: ", email);
    console.log("Password: ", password);

    var emailValidation = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    var passwordValidation = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*\d).*$/;

    if (first.length === 0 || last.length === 0 || email.length === 0 || password.length === 0) {
      setError('All values must be filled');
    } else if (!emailValidation.test(email)) {
      setError('Enter a proper email');
    } else if (password.length > 64) {
      setError('Password must be less than 64 characters');
    } else if (!passwordValidation.test(password)) {
      setError('Password must contain a special character and a number');
    } else if (existingEmail) {
      setError('Email is already linked to an account');
    } else {
      setError('');


      try {
        const response = await fetch("https://localhost:7268/api/Account/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FirstName: first,
            LastName: last,
            Email: email,
            Password: password,
          }),
        });
  
        if (!response.ok) {
          const errorMessage = `HTTP error! Status: ${response.status}`;
          const errorResponse = await response.text(); 
          console.error(errorMessage, errorResponse); 
          throw new Error(errorMessage);
        }
  
        const data = await response.json();
        setApiSuccess(true);
        setModalOpen(true);
      } catch (error) {
        console.error('Error during fetch:', error);
        setApiError("A network error occurred.");
        setModalOpen(true);
      }
    };
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
          First Name: <input name="firstName" value={first} onChange={(e) => setFirst(e.target.value)}
          type="first" id="first" />
        <br />
        <label htmlFor="name" className="entryField"></label>
          Last Name: <input name="lastName" value={last} onChange={(e) => setLast(e.target.value)}
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
