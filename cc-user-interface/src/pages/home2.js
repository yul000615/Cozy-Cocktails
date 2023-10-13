import './home2.css';
import { Link } from 'react-router-dom';

function Home2() {
  return (
    <header>
      <div className="homePage"> 
        <nav className="navigation">
          <div class="navigationMenu">
            <ul>
              <li><a href="#" class="link active">Home</a></li>
              <li><a href="#" class="link">About</a></li>
              <li><a href="#" class="link">Services</a></li>
              <li><a href="#" class="link">Contact</a></li>
            </ul>
          </div>

          <div class="navigationButton">
            <Link to="/createRecipe"><button className="button" id="createRecipeBtn">Create Recipe</button></Link>
            <Link to="/myAccount"><button className="button" id="myAccountBtn">My Account</button></Link>
            <Link to="/"><button className="button" id="logoutBtn">Log Out</button></Link>
          </div>
      </nav>
    </div>
    </header>
  );
}

export default Home2;
