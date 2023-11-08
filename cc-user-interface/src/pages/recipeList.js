import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import './recipeList.css';
import { Link } from 'react-router-dom';
import DetailedRecipe from './detailedRecipe'

function ErrorMessages({ error }) {
  if (!error) {
    return null;
  } else {
    return <p className='errorMessage'>{error}</p>;
  }
}

export default function RecipeList() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(false);
  //Start of ported code
  const [recipes, setRecipes] = useState([]);
  const [openDetailed, setOpenDetailed] = useState(false);
  const [recipe, setRecipe] = useState();
  //End of ported code
  const [recipeNames, setRecipeNames] = useState([
    'Long Island Iced Tea',
    'Margarita',
    'Martini',
    'Mojito',
    'Bloody Mary',
  ]);

  //Start of ported code
  const fetchRecipes = () => {
    fetch("https://localhost:7268/api/Recipe")
    .then((response) => response.json())
    .then(data => setRecipes(data))
    .catch((error) => {
        console.log(error)
    })
  }

  useEffect(() => {
    fetchRecipes()
  }, [])
  //End of ported code

  const [selectedRecipe, setSelectedRecipe] = useState('');

  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');

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

  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

  const inputProps = {
    placeholder: 'cocktail name',
    value,
    onChange: onChange,
    style: { fontStyle: 'italic' },
  };

  const theme = {
    suggestion: {
      backgroundColor: 'white',
    },
    suggestionsList: {
      listStyleType: 'none',
      padding: 0,
    },
  };

  return (
    <div className="ViewRecipeFields">
      <h1>Recipe search</h1>
      <ErrorMessages error={error || apiError} />
      <form className="recipeForm">
        <label className="entryField">
          {' '}
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={({ value }) => setSuggestions(getSuggestions(value))}
            onSuggestionsClearRequested={() => setSuggestions([])}
            getSuggestionValue={(suggestion) => suggestion}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            theme={theme}
          />
        </label>
        <br />

        //Start of ported code P.S. IDK if this being in the form will break it or not
        {recipes?.length > 0
          ? (
            <div className = "container">
              {recipes.map((recipe) => (
                <button 
                  onClick={() => {setOpenDetailed(true); setRecipe(recipe)}
                }>{recipe.name}</button>
              ))}
            </div>
          ) : (
            <div className = "empty">
              <h2>No Recipies Found</h2>
            </div>
          )}

        {openDetailed && <DetailedRecipe
          closeDetailed={setOpenDetailed}
          recipe={recipe}
        />}
        //End of ported code

        {selectedRecipe && (
          <div class="navigationButton">
            <Link to={`/detailedRecipe?name=${selectedRecipe}`}>
              <button className="button">Search</button>
            </Link>
          </div>
        )}
        <div className="navigationButton">
          <Link to="/">
            <button className="button">Back</button>
          </Link>
        </div>
      </form>

    </div>
  );
}
