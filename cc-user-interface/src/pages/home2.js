import "./home2.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import {useState, useContext} from "react";
import AppContext from "../AppContext";
import Logout from "./logout";
import RecipeList from "./recipeList";

function UserIngredients() {

  const [selectedOption, setSelectedOption] = useState('');

  //this default value should be replaced with whatever is in the user's ingredient list
  const [ingredients, setIngredients] = useState(['Vodka', 'Rum']);

  //this is an example; replace with list of all ingredients from databsase
  const ingredientList = ['Vodka', 'Rum', 'Gin', 'Tequila', 'Vermouth'];

  const optionList = [];

  for (var i in ingredientList){
    if (!ingredients.includes(ingredientList[i])){
      optionList.push({value: ingredientList[i].toLowerCase(), label: ingredientList[i]});
    }
  }

  function handleSelect(data) {
    setSelectedOption(data);
  }

  const deleteByValue = value => {
    //delete value from user's list in database
    //below should run only if thed database removal is successful
    setIngredients(oldValues => {
      return oldValues.filter(ingredient => ingredient !== value)
    })
  }

  const addValue = value => {
    //add value to user's list in database
    //below should run only if thed database addition is successful
    var ingredientList = ingredients.slice()
    ingredientList.push(value);
    setIngredients(ingredientList);
    setSelectedOption(ingredientList[0])
  }

  return (
    <div class='ingredientList'>
      <h1>Your Ingredients</h1>
      <br/>
      <ul className = 'list'>
        {ingredients.map(ingredient => {
          return (
            <li key={ingredient} className='ingredient'>
              <span>{ingredient}</span>
              <button className='deleteButton'  onClick={() => deleteByValue(ingredient)}>Delete</button>
            </li>
          )
        })}
      </ul>
      <br/>
      <h1>Add Ingredient</h1>
      <br/>
      <Select
        clasName='ingredientSelect'
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
      <button className="ingredientSubmit" onClick={() => addValue(selectedOption['label'])}>Submit</button>
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
                <li><a href="#" className="link active">Home</a></li>
                <li><a href="#" className="link">Services</a></li>
                <li><a href="#" className="link">FAQ</a></li>
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
          <UserIngredients />
          <div className="search">
          <RecipeList />
          </div>
        </div>
    </header>
  );
}
export default Home2;
