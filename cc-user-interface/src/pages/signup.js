import {useState} from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import './signup.css'

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
  const [existingEmail, setExistingEmail] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerClick = async (e) => {
    e.preventDefault();
    console.log("Email: ", email);
    console.log("Password: ", password);

    var emailValidation = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    var passwordValidation = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*\d).*$/;

    if (first.length === 0 || last.length === 0 || email.length === 0 || password.length === 0) {
      setError('All values must be filled');
    } else if (!emailValidation.test(email)) {
      setError('Please enter a valid email address');
    } else if (password.length > 64) {
      setError('Password must be less than 64 characters');
    } else if (!passwordValidation.test(password)) {
      setError('Password must contain a special character and a number');
    } else if (existingEmail) {
      setError('The provided email is already registered');
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
        console.log(response);
        if (!response.ok) {
          const errorMessage = `HTTP error! Status: ${response.status}`;
          const errorResponse = await response.text(); 
          console.error(errorMessage, errorResponse); 
          setError(errorResponse);
          //throw new Error(errorMessage);
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
    <div className="SignUpPage">
      <div className="SignUpWelcome">
        <h1>Welcome To Cozy Cocktails!</h1>
      </div>
      <ErrorMessages error={error || apiError} />
      <div className="SignUpFields">
        <div className="inputField">
          <label htmlFor="name">First Name: </label>
            <input name="first" value={first} onChange={(e) => setFirst(e.target.value)} 
            type="first" id="first" />
        </div>
        <div className="inputField">
          <label htmlFor="name">Last Name:</label>
            <input name="last" value={last} onChange={(e) => setLast(e.target.value)} 
            type="last" id="last" />
        </div>
        <div className="inputField">
        <label htmlFor="email">Email: </label>
          <input name="email" onChange={(e) => setEmail(e.target.value)} 
          type="email" id="email" />
        </div>
        <div className="inputField">
          <label htmlFor="password">Password: </label>
            <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} 
            type="password" id="password" />
        </div>
        <button className='registerBtn' onClick={registerClick}>Register</button>
        <Modal isOpen={modalOpen} onRequestClose={closeModal} className="Modal">
          {apiSuccess ? (
            <div>
              <h2>Account Creation Successful!</h2>
              <br />
              <Link to="/"><button onClick={closeModal}>Head to home page</button></Link>
            </div>
          ) : (
            <ErrorMessages error={error || apiError} />
          )}
        </Modal>
      </div>
    </div>
  );
}

export default SignUp;
