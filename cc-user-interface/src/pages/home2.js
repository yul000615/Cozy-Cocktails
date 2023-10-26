import './home2.css';
import { Link } from 'react-router-dom';
import Select from "react-select";
import {useState} from 'react';

function UserIngredients() {

  const [selectedOption, setSelectedOption] = useState('');

  //this default value should be replaced with whatever is in the user's ingredient list
  const [ingredients, setIngredients] = useState(['Vodka', 'Rum']);

  //this is an example; replace with list of all ingredients from database
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
        <UserIngredients/>
      </div>
    </header>
  );
}

export default Home2;
