import React from 'react';
import './home2.css';
import { Link } from 'react-router-dom';

function Home2() {
  return (
    <div className="HomePage">
      <div className="WelcomeHeader">
        <nav className="navigation">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </nav>
        <div className="buttons">
          <Link to="/createRecipe"><button class="createButton">Create Recipe</button></Link>
          <Link to="/myAccount"><button className="myaccountButton">My Account</button></Link>
          <Link to="/"><button className="logoutButton">Log Out</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Home2;
