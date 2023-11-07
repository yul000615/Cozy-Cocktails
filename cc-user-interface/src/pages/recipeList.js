import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import './recipeList.css';
import { Link } from 'react-router-dom';

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
  const [recipeNames, setRecipeNames] = useState([
    'Long Island Iced Tea',
    'Margarita',
    'Martini',
    'Mojito',
    'Bloody Mary',
  ]);

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
