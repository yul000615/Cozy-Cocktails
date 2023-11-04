import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import './recipeList.css';
import { Link } from 'react-router-dom';

export default function RecipeList() {
    const [name, setName] = useState('');
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
            : recipeNames.filter(
                  (name) => name.toLowerCase().slice(0, inputLength) === inputValue
              );
    };

    const onChange = (event, { newValue }) => {
        setValue(newValue);
        setName(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

    const inputProps = {
        placeholder: 'cocktail name',
        value,
        onChange: onChange,
        style: { fontStyle: 'italic' },
    };

    const submitClick = (e) => {
        e.preventDefault();
        const form = e.target.closest('form');
        const formData = new FormData(form);
        console.log(...formData);
    
        if (name) {
            setSelectedRecipe(name);
        }
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
            <form onSubmit={submitClick} className="recipeForm">
                <label className="entryField">
                    {' '}
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={(suggestion) => suggestion}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        theme={theme}
                    />
                </label>
                <br />

                {selectedRecipe ? (
                    <Link to={`/viewRecipe?name=${selectedRecipe}`} className="submitBtn">
                        Search
                    </Link>
                ) : (
                    <button className="submitBtn" type="submit" onClick={submitClick}>
                        Search
                    </button>
                )}
            </form>
        </div>
    );
}
