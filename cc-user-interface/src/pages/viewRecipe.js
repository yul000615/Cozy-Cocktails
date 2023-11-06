import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import './viewRecipe.css';

const recipeDetails = {
    'Long Island Iced Tea': {
        name: 'Long Island Iced Tea',
        ingredients: ['Vodka', 'White rum','Gin', 'Triple sec', 'Lemon juice', 'Syrup', 'Cola', 'Lemon wedge'],
        instructions: ['Add the vodka, rum, tequila, gin, triple sec, simple syrup and lemon juice to a Collins glass filled with ice.',
        'Top with a splash of the cola and stir briefly.',
        'Garnish with a lemon wedge.',
        'Serve with a straw.'],
        prepTime: '10 minutes',
        ABV: '15%',
        rate: 4.5,
        reviewCount: 25,
        image: 'long_island_ice_tea.jpeg',
    },
    'Margarita': {
        name: 'Margarita',
        ingredients: ['Gin', 'Tonic water', 'Lime', 'Ice'],
        instructions: ['Rim the edge of a cocktail glass with salt by coating the edge with lime juice and dipping into the salt.',
        'Add the other ingredients to a cocktail shaker with a few cubes of ice.',
        'Shake well for 10-15 seconds or until the outside of the shaker becomes frosted.',
        'Strain into a cocktail glass and serve.'],
        prepTime: '10 minutes',
        ABV: '23.6%',
        rate: 4.9,
        reviewCount: 20,
        image: 'margarita.jpg',
    },
    'Martini': {
        name: 'Martini',
        ingredients: ['Vodka', 'Olive juice', 'Dry Vermouth'],
        instructions: ['Add all the ingredients into a cocktail shaker with ice.', 
        'Shake well and strain into a cocktail glass.', 
        'Add olives on a cocktail stick as a garnish and serve'],
        prepTime: '5 minutes',
        ABV: '30.4%',
        rate: 4.5,
        reviewCount: 20,
        image: 'martini.jpeg',
    },
    'Mojito': {
        name: 'Mojito',
        ingredients: ['Lime juice', 'Mint leaves', 'White rum', 'Soda water', 'Sugar'],
        instructions: ['In the bottom of a highball glass, muddle the mint leaves with the sugar and lime juice to release the oils from the mint leaves.', 
        'Next add a splash of soda water and fill up the glass with crushed ice.', 
        'Add the rum, top up with the soda water and give it a stir.',
        'Garnish with a sprig of mint and a slice of lime and serve.'],
        prepTime: '10 minutes',
        ABV: '20.3%',
        rate: 5.0,
        reviewCount: 20,
        image: 'mojito.jpeg',
    },
    'Bloody Mary': {
        name: 'Bloody Mary',
        ingredients: ['Vodka', 'Tomato juice', 'Lemon juice', 'Worcestershire sauce', 'Tabasco sauce', 'Salt', 'Black pepper', 'Celery stalk'],
        instructions: ['In a mixing glass with ice add all the ingredients.', 
        'Stir gently to mix before pouring into a lowball glass.', 
        'Garnish with a stick of celery and serve.'],
        prepTime: '5 minutes',
        ABV: '11.1%',
        rate: 4.2,
        reviewCount: 20,
        image: 'bloody_marry.jpg',
    },
};

const getUsername = () => {
    return 'User123';
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

    const renderStars = () => {
        const rate = selectedRecipe.rate;
        const stars = [];
        const totalStars = 5;
    
        for (let i = 0; i < totalStars; i++) {
          if (i < Math.floor(rate)) {
            stars.push(<FaStar key={i} color="#ffc107" size={20} />);
          } else if (i === Math.floor(rate) && rate % 1 !== 0) {
            stars.push(<FaStarHalfAlt key={i} color="#ffc107" size={20} />);
          } else {
            stars.push(<FaStar key={i} color="#e4e5e9" size={20} />);
          }
        }
        return stars;
      };

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
                        <br />
                        {[...Array(5)].map((_, index) => (
                        <span key={index}>
                            {index + 1 <= Math.round(selectedRecipe.rate) ? (
                            <FaStar key={index} color="#ffc107" size={20} />
                            ) : (
                            <FaStarHalfAlt key={index} color="#ffc107" size={20} />
                            )}
                        </span>
                        ))}
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
