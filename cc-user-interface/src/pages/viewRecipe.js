import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './viewRecipe.css';

const recipeDetails = {
    'Long Island Iced Tea': {
        name: 'Long Island Iced Tea',
        ingredients: ['Tequila', 'Triple sec', 'Lime juice', 'Salt'],
        instructions: ['Instructions...'],
        prepTime: '10 minutes',
        ABV: '15%',
        rate: 4.5,
        reviewCount: 25,
        image: 'Long Island Iced Tea.jpg',
    },
    'Margarita': {
        name: 'Margarita',
        ingredients: ['Gin', 'Tonic water', 'Lime', 'Ice'],
        instructions: ['Instructions...'],
        prepTime: '5 minutes',
        ABV: '10%',
        rate: 4.0,
        reviewCount: 20,
        image: 'margarita.jpg',
    },
    'Martini': {
        name: 'Martini',
        ingredients: ['Gin', 'Tonic water', 'Lime', 'Ice'],
        instructions: ['Instructions for making Martini...'],
        prepTime: '5 minutes',
        ABV: '10%',
        rate: 4.0,
        reviewCount: 20,
        image: 'Martini.jpg',
    },
    'Mojito': {
        name: 'Mojito',
        ingredients: ['Gin', 'Tonic water', 'Lime', 'Ice'],
        instructions: ['Instructions for making Mojito...'],
        prepTime: '5 minutes',
        ABV: '10%',
        rate: 4.0,
        reviewCount: 20,
        image: 'Mojito.jpg',
    },
    'Bloody Mary': {
        name: 'Bloody Mary',
        ingredients: ['Gin', 'Tonic water', 'Lime', 'Ice'],
        instructions: ['Instructions for making Bloody Mary...'],
        prepTime: '5 minutes',
        ABV: '10%',
        rate: 4.0,
        reviewCount: 20,
        image: 'Bloody Mary.jpg',
    },
};

const getUsername = () => {
    return 'John Doe';
};

export default function ViewRecipe() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedRecipeName = searchParams.get('name');
    const selectedRecipe = recipeDetails[selectedRecipeName];

    if (!selectedRecipeName || !selectedRecipe) {
        console.log(selectedRecipeName);
        console.log('selectedRecipe:', selectedRecipe);
        return <div className="ViewRecipe">No recipe found</div>;
    }

    const username = getUsername();

    return (
        <div className="ViewRecipe">
            <div className="reportBtn">
                <button className="reportButton">Report Recipe</button>
            </div>
            <div className="editorBtn">
                <Link to="/"><button className="logoutButton">Log Out</button></Link>
                <button className="deleteButton">Delete</button>
                <button className="editButton">Edit</button>
            </div>
            <div className="recipeHeader">
                <h2>
                    {selectedRecipe && selectedRecipe.name} Recipe
                    <span className="usernameText"> by {username}</span>
                </h2>
                <div className="recipeRate">
                    <p>
                        Rate: {selectedRecipe.rate} | {selectedRecipe.reviewCount} Reviews
                    </p>
                </div>
                <div className="additionalInfo">
                    <p>Prep Time: {selectedRecipe.prepTime}</p>
                    <p>ABV: {selectedRecipe.ABV}</p>
                </div>
            </div>
            <div className="recipeContent">
                <div className="imageSection">
                    <img src={`/${selectedRecipe.image}`}/>
                    </div>
                <div className="ingredientSection">
                    <h3>Ingredients:</h3>
                    <ul>
                        {selectedRecipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div className="directionSection">
                    <h3>Directions:</h3>
                    <ol>
                        {selectedRecipe.instructions.map((direction, index) => (
                            <li key={index}>{direction}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}
