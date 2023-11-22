import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './myAccount.css';
import DeleteAccount from './deleteAccount';

function MyAccount() {
  const profileImageUrl = 'https://example.com/user-profile-image.jpg';

  return (
    <div className="MyAccountPage"> 

      <div className="CenterContent">
        <div className="MyAccountPageWelcome">
          <h1>My Account Page</h1>
        </div>


        <div className="ProfileContainer">
          <div className="ProfileUpdate">
            <div className="ProfileImage">
              <img
                src={profileImageUrl}
                alt="Profile Image"
              />
            </div>
            <button className="profileButton">Change Profile Picture</button>
          </div>
        </div>

        <div className="handlerButton">
          <div className="updateAccount">
            <Link to='/updateAccount'><button className="updateAccountButton">Update Account Information</button></Link>
          </div>
          <div className="deleteAccount">
            <DeleteAccount></DeleteAccount>
          </div>
          <div className="downloadData">
            <button className="downloadDataButton">Download My Data</button>
          </div>
         </div>
        <div className="homeButton">
          <Link to="/home2"><button className="homeButton">Go Back to Homepage</button></Link>
        </div>
      </div>
      </div>
  );
  }

export default MyAccount;