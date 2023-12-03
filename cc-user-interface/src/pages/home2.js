import "./home2.css";
import { Link } from "react-router-dom";
import React from "react";
import Logout from "./logout";
import RecipeList from "./recipeList";
import UserIngredients from "./userIngredients";

function Home2() {
  return (
      <header>
        <div className="homePage">
          <div className="navigation">
            <div className="logo">
              <p>Cozy Cocktails</p>
            </div>
            {/* <div className="navigationMenu">
              <ul>
                <li><Link to="/home2" className="link">Home</Link></li>
                <li><Link to="/contact" className="link">Contact</Link></li>
              </ul>
            </div> */}

            <div class="navigationButton">
            <Link to="/createRecipe"><button className="button" id="createRecipeBtn">Create Recipe</button></Link>
            <Link to="/myAccount"><button className="button" id="myAccountBtn">My Account</button></Link>
            <Logout/>
            </div>
          </div>
            <div className="ubi"><UserIngredients /></div>
            <div className="recipeListr"><RecipeList /></div>
        </div>
    </header>
  );
}
export default Home2;