import './home.css';
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div className="SignUpPage">
      <div className="WelcomeHeader">
        <Link to="/signup"><button class="signUpButton">Sign Up</button></Link>
      </div>
    </div>
  );
}

export default Home;