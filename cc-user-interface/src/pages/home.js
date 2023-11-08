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
        className="filterKeyword"
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
        <button className="listButton" id="addButton" onClick={() => addValue(selectedOption['label'])}>Add</button>
      <ul className='list'>
        {ingredients.map(ingredient => {
          return (
            <li key={ingredient} className='ingredient'>
              <span>{ingredient}</span>
              <button className="listButton" id="deleteButton" onClick={() => deleteByValue(ingredient)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

function CocktailList({ recipes }) {
  return (
    <ul>
      {recipes.map((recipe, index) => (
        <li key={index}>{recipe}</li>
      ))}
    </ul>
  );
}

function Home() {

  const [showRecipeContainer, setShowRecipeContainer] = useState(false);
  const recipes = ['Long Island Iced Tea','Margarita', 'Martini', 'Mojito', 'Bloody Mary'];
  const images = [
    'bloody_mary.jpg',
    'margarita.jpeg',
    'martini.jpeg',
    'mojito.jpeg',
    'long_island_ice_tea.jpeg'
  ];
  const handleSearch = () => {
    setShowRecipeContainer(true);
  };
  const handleCloseModal = () => {
    setShowRecipeContainer(false);
  };

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
                <button className="signupButton" id="loginBtn">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="loginButton" id="signupBtn">Log In</button>
              </Link>
            </div>
          </nav>

          <div className="filterContainer">
            <h1>Cocktail Finder</h1>
            <div className="container">
              <div className="filterSearch"><FilterSearch /></div>
              <div className="filterList"><FilterList /></div>
            </div>
            <button className="searchButton" onClick={handleSearch}>
            Search
          </button>
          <br />

            {showRecipeContainer && (
            <div className="recipeContainer">
              <h3>We found recipes for you!</h3>
              <ul className="cocktailList">
      {recipes.map((recipe, index) => (
        <li key={index} className="cocktailItem">
          <img src={images[index]} alt={recipe} className="cocktailImage" />
          <span>{recipe}</span>
        </li>
      ))}
    </ul>
              <button className="closeBtn" onClick={handleCloseModal}>Close</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default Home;

