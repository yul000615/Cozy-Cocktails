import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './myAccount.css';

function MyAccount() {
  // Replace with real one later
  const profileImageUrl = 'https://example.com/user-profile-image.jpg';

  const [newUsername, setNewUsername] = useState(''); 
  const handleNewUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  return (
    <div className="MyAccountPage">
      <div className="CenterContent">
        <div className="ProfileContainer">
          <div className="ProfileImage">
            <img
              src={profileImageUrl}
              alt="Profile Image"
              style={{ width: '200px', height: '200px', borderRadius: '50%', display: 'block' }}
            />
          </div>
          <div className="WelcomeContainer">
            <div className="MyAccountPageWelcome">
              <h1>Welcome, [User's Name]</h1>
            </div>
            <div className="myAccountButtonContainer">
              <input
                type="text"
                placeholder="New Username"
                value={newUsername}
                onChange={handleNewUsernameChange}
              />
              <button className="myAccountButton">Update Username</button>
            </div>
          </div>
        </div>

        <div className="MyAccountButtons">
          <div className="myAccountButtonContainer">
            <button className="myAccountButton">Edit Profile Picture</button>
          </div>
          <div className="myAccountButtonContainer">
            <button className="myAccountButton">Delete My Account</button>
          </div>
          <div className="myAccountButtonContainer">
            <button className="myAccountButton">Update Account Information</button>
          </div>
          <div className="myAccountButtonContainer">
            <button className="myAccountButton">Download My Data</button>
          </div>
        </div>
        <div className="LogoutButton">
          <Link to="/">Logout</Link>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
