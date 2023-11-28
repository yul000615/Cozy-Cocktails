import "./home2.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import React, { useState, useEffect, useContext } from "react";
import AppContext from "../AppContext";
import Logout from "./logout";
import RecipeList from "./recipeList";

function UserIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [optionList, setOptionList] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const context = useContext(AppContext);
  const loggedIn = context.token !== 'no token' && context.token !== '';

  useEffect(() => {
    if (loggedIn) {
      fetchUserIngredients();
      updateOptionList();
    }
  }, [loggedIn]);

  const fetchUserIngredients = () => {
    fetch("https://localhost:7268/api/UserBarIngredient/getUserBarIngredients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${context.token}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed with status: ' + response.status);
      }
      return response.json();
    })
    .then(fetchedIngredients => {
      if (Array.isArray(fetchedIngredients)) {
        setIngredients(fetchedIngredients);
      } else {
        console.error('Data is not an array:', fetchedIngredients);
      }
    })
    .catch(error => console.log("Error fetching ingredients: ", error));
  };

  const updateOptionList = () => {
    const optionList = ['vodka', 'rum', 'gin', 'tequila', 'vermouth'];
    const newOptionList = optionList
      .filter(availableIngredient => !ingredients.some(userIngredient => userIngredient.ingredientName === availableIngredient))
      .map(ingredient => ({ value: ingredient.toLowerCase(), label: ingredient }));

    setOptionList(newOptionList);
  };

  const addIngredient = (ingredientName) => {
    fetch("https://localhost:7268/api/UserBarIngredient/addUserBarIngredient", {
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
    .then(ingredient => {
      if (ingredient && ingredient.ingredientName) {
        setIngredients(prevIngredients => [...prevIngredients, ingredient]);
        deleteToOptions(ingredientName);
      } else {
        console.log("Invalid ingredient data:", ingredient);
      }
    })
    .catch(error => console.log("Error adding ingredient: ", error));
  };

  const deleteIngredient = (ingredient) => {
    const ingredientName = ingredient.ingredientName;
    fetch("https://localhost:7268/api/UserBarIngredient/deleteUserBarIngredient", {
      method: "DELETE",
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
        throw new Error("Request failed with status: " + response.status);
      } else {
        const updatedIngredients = ingredients.filter(
          ing => ing.ingredientName !== ingredientName
        );
        setIngredients(updatedIngredients);
        addToOptions(ingredientName);
      }
    })
    .catch(error => {
      console.error("Error deleting ingredient:", error);
    });
  };

  const addToOptions = (ingredientName) => {
    const newOption = { value: ingredientName.toLowerCase(), label: ingredientName };
    setOptionList(prevOptions => [...prevOptions, newOption]);
  };
  const deleteToOptions = (ingredientName) => {
    const updatedOptions = optionList.filter(option => option.label !== ingredientName);
    setOptionList(updatedOptions);
  };

  const addClick = () => {
    if (selectedOption) {
      addIngredient(selectedOption.label);
    }
  };

  const deleteClick = (ingredient) => {
    deleteIngredient(ingredient);
  };

  const handleSelect = (value) => {
    setSelectedOption(value);
  };

  const displayIngredients = () => {
    return (
      <div className="userIngredientContainer">
        <h1>User Ingredients</h1>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient && ingredient.ingredientName ? ingredient.ingredientName : ''}
              <button onClick={() => deleteClick(ingredient)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <div className="userIngredientList">
        <h1>Add Ingredient</h1>
        <Select
          options={optionList}
          value={selectedOption}
          onChange={handleSelect}
          placeholder="Select ingredient"
        />
        <button onClick={addClick}>Add</button>
      </div>
      {displayIngredients()}
    </div>
  );
}

function Home2() {
  const context = useContext(AppContext);
  return (
      <header>
        <div className="homePage">
          <div className="navigation">
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
          </div>
            <div className="ubi"><UserIngredients /></div>
            <div className="recipeListr"><RecipeList /></div>
        </div>
    </header>
  );
}
export default Home2;