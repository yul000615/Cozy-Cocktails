import './signup.css'
import { useState } from 'react'

function SignUp() {

    function registerClick() {
        alert('You clicked me!');
    }

    return (
      <div className="SignUpPage">
        <div className="SignUpWelcome">
          <h1>Welcome To</h1>
          <h1>Cozy Cocktails!</h1>
        </div>
        <div className="SignUpFields">
            <label className = "entryField">
            First Name: <input name="userFirstName" />
            </label>
            <br/>
            <label className = "entryField">
            Last Name: <input name="userLastName" />
            </label>
            <br/>
            <label className = "entryField">
            Email: <input name="userEmail" />
            </label>
            <br/>
            <label className = "entryField">
            Password: <input name="userEmail" />
            </label>
            <br/>
            <label className = "entryField">
            Re-enter Password: <input name="userEmail" />
            </label>
            <br/>
            <button className='registerBtn' onClick={registerClick}>Register</button>
        </div>
      </div>
    );
  }
  
export default SignUp;