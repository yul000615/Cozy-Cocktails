import './home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <header>
      <div className="homePage"> 
        <nav className="navigation">
          <div class="logo"> <p>Cozy Cocktails</p>
          </div>
          <div className="navigationMenu">
            <ul>
              <li><a href="#" className="link active">Home</a></li>
              <li><Link to="/recipeList" className="link">Recipe Search</Link></li>
              <li><a href="#" className="link">Services</a></li>
              <li><a href="#" className="link">FAQ</a></li>
            </ul>
          </div>

          <div class="navigationButton">
            <Link to="/signup"><button className="button" id="loginBtn">Sign Up</button></Link>
            <Link to="/login"><button className="button" id="signupBtn">Log In</button></Link>
          </div>
      </nav>
    </div>
    </header>
  );
}

export default Home;
