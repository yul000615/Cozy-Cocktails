import './home.css';
import { Link } from 'react-router-dom';
import Select from "react-select";
import { useState } from "react";
import RecipeList from './recipeList';
import cocktailImage from './cocktail.jpeg';

function Home() {
  return (
      <header>
        <div className="homePage">
          <nav className="navigation">
            <div className="logo">
              <p>Cozy Cocktails</p>
            </div>
            <div className="navigationMenu">
              <ul>
                <li><Link to="/" className="link">Home</Link></li>
                <li><Link to="/contact" className="link">Contact</Link></li>
              </ul>
            </div>

            <div className="navigationButton">
              <Link to="/signup">
                <button className="signupButton" id="loginBtn">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="loginButton" id="signupBtn">Log In</button>
              </Link>
            </div>
          </nav>
          <div className="decoration">
            <p>Welcome to Cozy Cocktails-!</p>
            <img src="cocktail.jpeg" alt="Cocktail" style={{ width: '300px', height: 'auto' }} />
          </div>
          <RecipeList />

        </div>
    </header>
  );
}
export default Home;

