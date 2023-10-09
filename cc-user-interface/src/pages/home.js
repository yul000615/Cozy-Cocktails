import './home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="HomePage">
      <div className="WelcomeHeader">
        <nav className="navigation">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </nav>
        <div className="loginButtons">
          <Link to="/signup"><button className="signUpButton">Sign Up</button></Link>
          <Link to="/createRecipe"><button class="createButton">Create Recipe</button></Link>
          <Link to="/login"><button className="loginButton">Log In</button></Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
