import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './contact.css';
import AppContext from '../AppContext';

function Contact() {
  const context = useContext(AppContext)

  return (
    <header>
      <div className="homePage">
        <nav className="navigation">
          <div className="logo">
            <p>Cozy Cocktails</p>
          </div>
          <div className="navigationMenu">
            <ul>
              <li><Link to={context.token == 'no token' ? '/':'/home2'} className="link">Home</Link></li>
              <li><Link to="/contact" className="link">Contact</Link></li>
            </ul>
          </div>

          <div className="navigationButton">
            <Link to="/signup">
              <button className="signupButton" id="signupBtn">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="loginButton" id="loginBtn">Log In</button>
            </Link>
          </div>
        </nav>

        <div className="header">
          <h1 className="contactTitle">Contact Us</h1>
            <div className="box">
              <div className="email">
                <h2>Email </h2>
                <h3 className="contactEmail">customerservice@gmail.com </h3>
                <br />
              <div className="phone">
                <h2 className="contactPhone">Phone </h2>
                <h3 className="contactEmail">+1 (111) 111-1111 </h3>
              </div>
            </div>
        </div>
      </div>
      </div>
    </header>
  );
}

export default Contact;
