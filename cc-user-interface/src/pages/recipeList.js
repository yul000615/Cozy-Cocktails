import React, { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import './recipeList.css';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import { useContext } from 'react';
import Select from "react-select";
import DetailedRecipe from "./detailedRecipe"; 

function ErrorMessages({ error }) {
  if (!error) {
    return null;
  } else {
    return <p className='errorMessage'>{error}</p>;
  }
}

/*
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
*/

/*
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
)}
*/

/*
function CocktailList({ recipes }) {
  return (
    <ul>
      {recipes?.length > 0
        ? (
          <div className="container">
            {recipes.map((recipe) => (
                <button onClick={() => {setShowModal(true); setSelectedRecipe(recipe)}
              }>{recipe.name}</button>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No Recipes Found</h2>
          </div>
        )
      }
    </ul>
  );
}
*/

function RecipeList() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [apiError, setApiError] = useState(null);
  const [isFavoritedChecked, setFavoritedIsChecked] = useState(false);
  const handleFavoritedOnChange = () => {
    setFavoritedIsChecked(!isFavoritedChecked);
  };
  const [isIngredientsChecked, setIngredientsIsChecked] = useState(false);
  const handleIngredientsOnChange = () => {
    setIngredientsIsChecked(!isIngredientsChecked);
  };
  const [apiSuccess, setApiSuccess] = useState(false);
  const [recipeNames, setRecipeNames] = useState([
    'Long Island Iced Tea',
    'Margarita',
    'Martini',
    'Mojito',
    'Bloody Mary',
  ]);
  var loggedIn;
  const context = useContext(AppContext);
  loggedIn = (context.token !== 'no token' && context.token !== '');
  console.log(context.token);
  var routeString;
  if (loggedIn){
      routeString = "/home2"
  }else {
      routeString = "/"
  }

  function LoggedInItems (){
    console.log(loggedIn)
    if (!loggedIn){
        return null;
    } else{
        return (
          <><div className="FavoritedButton">
            <input
              type="checkbox"
              id="favorite"
              name="favorite"
              value="Favorited"
              checked={isFavoritedChecked}
              onChange={handleFavoritedOnChange} />
            From Favorites
          </div><div className="IngredientsButton">
              <input
                type="checkbox"
                id="ingredients"
                name="ingredients"
                value="ingredients"
                checked={isIngredientsChecked}
                onChange={handleIngredientsOnChange} />
              Uses Your Ingredients
            </div></>
        );
    }
}

const [selectedRecipe, setSelectedRecipe] = useState();
const [recipes, setRecipes] = useState([])
const [suggestions, setSuggestions] = useState([]);
const [value, setValue] = useState('');
/*
const getSuggestions = (value) => {
const inputValue = value.trim().toLowerCase();

const inputLength = inputValue.length;
  return inputLength === 0
  ? []
  : recipeNames.filter((name) => name.toLowerCase().slice(0, inputLength) === inputValue);
};
const onChange = (event, { newValue }) => {
  setValue(newValue);
  
  const selected = getSuggestions(newValue)[0];
  if (selected) {
    setSelectedRecipe(selected);
  } else {
    setSelectedRecipe('');
  }

};
*/

/*const renderSuggestion = (suggestion) => <div>{suggestion}</div>;*/

/*
const inputProps = {
  placeholder: 'cocktail name',
  value,
  onChange: onChange,
  style: { fontStyle: 'italic' },
};
*/

const theme = {
  suggestion: {
    backgroundColor: 'white',
  },
  suggestionsList: {
    listStyleType: 'none',
    padding: 0,
  },
 };

const searchRecipes = ({ useFav, useBarIgd, term }) => {
  fetch("https://localhost:7268/api/Recipe/getRecipes", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${context.token}`
    },
        body: JSON.stringify({
            loggedIn: loggedIn,
            favorited: useFav,
            useBarIngredients: useBarIgd,
            searchQuery: term
        }),
    })
    .then(
      (response) => response.json())
    .then(
      data => setRecipes(data))
    .catch(
      (error) => {console.log(error)
    })
}

useEffect(() => {
  searchRecipes(false, false, "")
}, [])

const openModal = () => {
  setShowModal(true);
};

const closeModal = () => {
  setShowModal(false);
};

const handleRecipeSelection = (selectedRecipeName) => {
  setSelectedRecipe(selectedRecipeName); // Update the selected recipe name
  setShowModal(true); // Open the modal to display the detailed recipe
};

 return (
 <div className="headerButtons">
    {/* <div className="logo">
       <p>Cozy Cocktails</p>
    </div>
            <div className="navigationMenu">
              <ul>
                <li><a href="#" className="link active">Home</a></li>
                <li><a href="#" className="link">Services</a></li>
                <li><a href="#" className="link">FAQ</a></li>
              </ul>
            </div>
        <Link to="/home2">
          <button className="headerButton">Home</button>
        </Link>     */}
        <div className="container">
          
          <div className="searchRecipePage">
            <div class="buttons">
              {/* <a class="backButton" href="#"><Link to={routeString}>Go Back to Homepage</Link></a> */}
              </div>
              <h1>Recipe search</h1>
              <ErrorMessages error={error || apiError} />
              <div className="searchContainer">
                <div className="byName">
                  <h2>By name</h2>
                  {/*
                  {' '}
                  */}
                  <input
                    placeholder = "Cocktail name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  {/*
                  <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
                  onSuggestionsClearRequested={() => setSuggestions([])}
                  getSuggestionValue={(suggestion) => suggestion}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}
                  theme={theme}
                />
                */}
              </div>
              {/*
              <div className="byKeyword"><FilterSearch/></div>
              <div className="byIngredient"><FilterList/></div>
              */}
              <div className="displayRecipeList">
                  {recipes?.length > 0
                  ? (
                      <div>
                        {recipes.map((recipe) => (
                          <button onClick={() => {openModal(); setSelectedRecipe(recipe)}
                          }>{recipe.name}</button>
                        ))}
                      </div>
                  ) : (
                    <div>
                      <h2>No Recipes Found</h2>
                    </div>
                  )}
              </div>
              
              <div className="loggedInItems"><LoggedInItems/></div>
              <br />
              </div>
              <div className="additionalButtons">
                <div className="FavoritedButton"></div>
                <div className="IngredientsButton"></div>
                <button className="searchButton" onClick={() => {searchRecipes(isFavoritedChecked, isIngredientsChecked, value)}}>Search</button>
              </div>
            </div>

            {showModal && <DetailedRecipe
            closeDetailed={closeModal}
            recipe={selectedRecipe}
            />}
            </div>
          </div>
        );
}
export default RecipeList;