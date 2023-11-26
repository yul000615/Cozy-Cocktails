import "./home2.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import {useState, useContext} from "react";
import AppContext from "../AppContext";
import Logout from "./logout";
import RecipeList from "./recipeList";

function UserIngredients() {
  var loggedIn;
  const [add, setAdd] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const context = useContext(AppContext);
  loggedIn = (context.token !== 'no token' && context.token !== '');
  var routeString;
  if (loggedIn){
      routeString = "/home2"
  }else {
      routeString = "/"
  }
  const [ingredients, setIngredients] = useState(['Vodka', 'Rum']); // Change this to hold the user's ingredients
  const ingredientList = ['Vodka', 'Rum', 'Gin', 'Tequila', 'Vermouth'];
  const optionList = [];

  for (var i in ingredientList) {
    if (!ingredients.includes(ingredientList[i])) {
      optionList.push({ value: ingredientList[i].toLowerCase(), label: ingredientList[i] });
    }
  }

  function handleSelect(data) {
    setSelectedOption(data);
  }

  function addIngredient(ingredientName) {
    console.log('Access Token:', context.token);


    fetch("https://localhost:7268/api/UserBarIngredient/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${context.token}`
      },
      body: JSON.stringify({
        ingredientName: ingredientName
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed with status: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log("Added:", data);
      setIngredients([...ingredients, ingredientName]);
      setSelectedOption('');
    })
    .catch(error => console.log("Error adding ingredient: ", error));
  }

  function deleteIngredient(listID) {
    fetch("https://localhost:7268/api/UserBarIngredient/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${context.token}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed with status: ' + response.status);
      }
      console.log("Deleted ingredient successfully");
      // Handle success response
    })
    .catch(error => {
      console.error("Error deleting ingredient:", error);
      // Handle error cases
    });
  }

  function addClick() {
    if (selectedOption) {
      addIngredient(selectedOption.label);
    }
  }

  function deleteClick(ingredient) {
    deleteIngredient(ingredient);
  }
  return (
    <div className='ingredientList'>
      <h1>Your Ingredients</h1>
      <br/>
      <ul className = 'list'>
        {ingredients.map(ingredient => {
          return (
            <li key={ingredient} className='ingredient'>
            <span>{ingredient}</span>
            <button className='deleteButton' onClick={() => deleteClick(ingredient)}>Delete</button>
          </li>
          )
        })}
      </ul>
      <br/>
      <h1>Add Ingredient</h1>
      <br/>
      <Select
        className='ingredientSelect'
        options={optionList}
        value={selectedOption}
        onChange={handleSelect}
        isSearchable={true}
        placeholder="Add ingredient"
        menuPlacement='auto'
        menuPosition="fixed"
        autosize={false}
        styles={{width: '82%'}}
      />
      <br/>
      <button className="ingredientSubmit" onClick={addClick}>Submit</button>
    </div>
  )
}

function Home2() {
  const context = useContext(AppContext);
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

            <div class="navigationButton">
            <Link to="/createRecipe"><button className="button" id="createRecipeBtn">Create Recipe</button></Link>
            <Link to="/myAccount"><button className="button" id="myAccountBtn">My Account</button></Link>
            <Logout/>
            </div>
          </nav>
          <UserIngredients />
          <div className="search">
          <RecipeList />
          </div>
        </div>
    </header>
  );
}
export default Home2;