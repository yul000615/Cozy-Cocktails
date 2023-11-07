import './home.css';
import { Link } from 'react-router-dom';
import Select from "react-select";
import { useState } from 'react';

function FilterSearch() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(false);
  const [ingredientNames, setingredientNames] = useState();
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : ingredientNames.filter((name) => name.toLowerCase().slice(0, inputLength) === inputValue);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    const selected = getSuggestions(newValue)[0];
    if (selected) {
      setSelectedIngredient(selected);
    } else {
      setSelectedIngredient('');
    }
  };
  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;
  const inputStyle = {
    fontStyle: 'italic',
  };

  return (
    <div className="entryField">
      <h2>By keyword</h2>
      <input
        name="filterKeyword"
        placeholder="enter a keyword"
        label="cocktail name"
        style={inputStyle}
      />
    </div>
  );
}

function FilterList() {
  const [selectedOption, setSelectedOption] = useState('');
  const [ingredients, setIngredients] = useState([]);
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

  const deleteByValue = value => {
    setIngredients(oldValues => {
      return oldValues.filter(ingredient => ingredient !== value)
    })
  }

  const addValue = value => {
    var ingredientList = ingredients.slice()
    ingredientList.push(value);
    setIngredients(ingredientList);
    setSelectedOption(ingredientList[0])
  }

  return (
    <div>
      <div class='entryField'>
        <h2>By ingredients</h2>
        <Select
          clasName='ingredientSelect'
          options={optionList}
          value={selectedOption}
          onChange={handleSelect}
          isSearchable={true}
          menuPlacement='auto'
          menuPosition='auto'
          autosize={false}
          styles={{ width: '50%',}} />
        <button className="ingredientSubmit" onClick={() => addValue(selectedOption['label'])}>Add</button>
      </div>
      <ul className='list'>
        {ingredients.map(ingredient => {
          return (
            <li key={ingredient} className='ingredient'>
              <span>{ingredient}</span>
              <button className='deleteButton' onClick={() => deleteByValue(ingredient)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

function Home() {
  return (
      <header>
        <div className="homePage">
          <nav className="navigation">
            <div class="logo">
              <p>Cozy Cocktails</p>
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
              <Link to="/signup">
                <button className="button" id="loginBtn">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="button" id="signupBtn">Log In</button>
              </Link>
            </div>
          </nav>

          <div className="filterContainer">
            <h1>Cocktail Finder</h1>
            <div className="container">
            <div className="filterSearch"><FilterSearch /></div>
            <div className="filterList"><FilterList /></div>
            </div>
            <button className="submitBtn" id="submitButton">Search</button>
          </div>
        </div>
      </header>
  );
}
export default Home;

