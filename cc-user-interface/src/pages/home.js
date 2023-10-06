import './home.css';
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div className="HomePage">
      <div className="WelcomeHeader">
        <Link to="/createRecipe"><button class="createButton">Create Recipe</button></Link>
        <Link to="/signup"><button class="signUpButton">Sign Up</button></Link>
      </div>
    </div>
  );
}

export default Home;