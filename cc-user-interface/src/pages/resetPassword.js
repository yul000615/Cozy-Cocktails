import {useState} from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import './resetPassword.css'

Modal.setAppElement('#root');

function ErrorMessages({ error }) {
  if (!error) {
    return null;
  } else {
    return <p className='errorMessage'>{error}</p>;
  }
}

export const ResetPassword = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailExist, setEmailExist] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  function closeModal() {
    setModalOpen(false);
  }

  function SubmitClick(){
    var emailValidation = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    var passwordValidation = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*\d).*$/;

    if (email.length === 0 || password.length === 0) {
      setError('All values must be filled');
    } else if (!emailValidation.test(email)) {
      setError('Please enter a valid email address');
    } else if (password.length > 64) {
      setError('Password must be less than 64 characters');
    } else if (!passwordValidation.test(password)) {
      setError('Password must contain a special character and a number');
    } else if (!emailExist){
      setError('Email not associated with an account')
    } else {
      setError('');
      setModalOpen(true)
    }
  }

  return (
    <div className="ResetPage">
      <div className="ResetWelcome">
        <h1>Reset Your Password!</h1>
      </div>
      <ErrorMessages error={error} />
      <div className="ResetFields">
        <label htmlFor="email" className="ResetField"></label>
          Email: <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} 
          type="email" id="email" />
        <br />
        <label htmlFor="password" className="ResetField"></label>
          Password: <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} 
          type="password" id="password" />
        <br />
        <button className='resetBtn' onClick={SubmitClick}>Submit</button>
      </div>
      <Modal isOpen={modalOpen} onRequestClose={closeModal} className="Modal" maskClosable={false} shouldCloseOnOverlayClick={false}>
        <div>
            <h2>Reset Successful!</h2>
            <br />
            <Link to="/login"><button onClick={closeModal}>Login</button></Link>
        </div>
      </Modal>
    </div>
  );
}

export default ResetPassword;