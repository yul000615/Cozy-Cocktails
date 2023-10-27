import './home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <header>
      <div className="homePage"> 
        <nav className="navigation">
          <div class="logo"> <p>Cozy Cocktails</p>
          </div>
          <div class="navigationMenu">
            <ul>
              <li><a href="#" class="link active">Home</a></li>
              <li><a href="#" class="link">About</a></li>
              <li><a href="#" class="link">Services</a></li>
              <li><a href="#" class="link">Contact</a></li>
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
