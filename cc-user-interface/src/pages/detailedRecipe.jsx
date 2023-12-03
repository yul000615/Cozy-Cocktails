import React, { useState, useContext, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import "./detailedRecipe.css";
import Modal from "react-modal";
import Heart from "react-animated-heart";
import ReactStars from "react-rating-stars-component";
import AppContext from '../AppContext';

/*
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
        rate: 3.9,
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
        rate: 4.8,
        reviewCount: 20,
        image: 'margarita.jpeg',
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
        rate: 4.9,
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
*/

const getUsername = () => {
    return 'User123';
};

const DetailedRecipe = ({ closeDetailed, recipe }) => {
//const selectedRecipe = recipeDetails[recipe];
var loggedIn;
const context = useContext(AppContext);
loggedIn = (context.token !== 'no token');

const [issue, setIssue] = useState("");
const [reportOpen, setReportOpen] = useState(false);
const [reportMessage, setReportMessage] = useState("");
const [rateOpen, setRateOpen] = useState(false);
const [rateMessage, setRateMessage] = useState("");
const [rating, setRating] = useState(0);

const [recipeU, setRecipe] = useState(null);
const [favorite, setFavorite] = useState(false);
const [favoriteObject, setFavoriteObject] = useState(null);
const [review, setReview] = useState(false);
const [feedback, setFeedback] = useState("");
const [recipeIngredients, setRecipeIngredients] = useState([]);
const [toggle, setToggle] = useState(false);

function setInitialFavoriteInfo(){
    if (!loggedIn) 
        return;
    //insert logic to check if favorited and set favorite to true or false depending on response
    //set favoriteObject to the favorite object returned
    fetch("https://localhost:7268/api/UserFavoriteRecipe/getFavorited", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${context.token}`
        },
            body: JSON.stringify({
                recipeID: recipe.recipeId
            }),
        })
        .then(
            (response) => response.json())
        .then(
            data => setFavoriteObject(data),
            setFavorite(true))
        .catch(
            (error) => {
            setFavorite(false)
            setFavoriteObject(null)
        })
}

function getRecipeIngredients(){
    fetch("https://localhost:7268/api/Recipe/getRecipeIngredients", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
            body: JSON.stringify({
                recipeID: recipe.recipeId
            }),
        })
        .then(
            (response) => response.json())
        .then(
            data => setRecipeIngredients(data))
        .catch(
            (error) => {console.log(error)
        })
}

function getRecipeUpdate(){
    fetch("https://localhost:7268/api/Recipe/getRecipeSingle?recipeID=" + recipe.recipeId, {
            method: "GET",
        })
        .then(
            response => response.json(),
            error => console.log("Error: ", error)
        )
        .then(
            data => setRecipe(data),
        )
}

useEffect(() => {
    getRecipeUpdate();
    getRecipeIngredients(); 
    setInitialFavoriteInfo();
}, [])

const handleRating = (rate) => {
    setRating(rate)

    // other logic
  }

function LoggedInItems (){
    if (!loggedIn){
        return null;
    } else{
        return (
        <><Heart hidden={!loggedIn} isClick={favorite} onClick={favoriteClick} />
        <button className="actionBtn" onClick={openRate}>Rate</button></>
        );
    }
}

function openReport(){
    setReportOpen(true);
}

function closeReport(){
    setReportOpen(false);
}

function reportSubmit(){
    if (issue.length===0) {
        setReportMessage('Must enter an issue before submitting');
    } else{
        setReportMessage('Thank you! We will review your report shortly.')
    }
}

function favoriteClick(){
    if (favoriteObject) {
        console.log(favoriteObject.listId)
        //make backend call to remove the favorite and set the heart to grey if successful
        fetch("https://localhost:7268/api/UserFavoriteRecipe/unfavorite?favID=" + favoriteObject.listId, {
            method: "DELETE",
            // headers: {
            // "Content-Type": "application/json"
            // },
            // body: JSON.stringify({
            //     favID: favoriteObject.listId
            // }),
        })
        .then(
            response => response.json(),
            error => console.log("Error: ", error)
        )
        .then(
            setFavorite(false),
            setFavoriteObject(null)
        )
    } else {
        //make backend call to add to favorites and set the heart to red if successful
        fetch("https://localhost:7268/api/UserFavoriteRecipe/favorite", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${context.token}`
            },
                body: JSON.stringify({
                    recipeID: recipeU.recipeId
                }),
            })
            .then(
                response => response.json(),
                error => console.log("Error: ", error)
            )
            .then(
                data => setFavoriteObject(data),
                setFavorite(true)
            )
        }
    console.log()
    }

    function rateSubmit(){ //Currently only handles creating a review
        console.log(rating)
        if (rating===0) {
            setRateMessage('Must give a rating');
        } else if (feedback.length===0){
            setRateMessage('Must leave a feedback message');
        } else {
            //insert backend logic for rating here and run the below if successful
            fetch("https://localhost:7268/api/Review/createReview", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${context.token}`
            },
                body: JSON.stringify({
                    Rating: rating,
                    Feedback: feedback,
                    recipeID: recipeU.recipeId
                }),
            })
            .then(
                response => response.json(),
                error => console.log("Error: ", error)
            )
            .then(
                data => setReview(data),
                setToggle(!toggle)
            )
            setRateMessage('')
            setRateOpen(false);
            getRecipeUpdate();
        }
    }

    function openRate(){
        setRateOpen(true);
        setRating(0);
        setFeedback('');
    }
    
    function closeRate(){
        setRateOpen(false);
        setRateMessage('');
    }

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedRecipeName = searchParams.get('name');

    if (!recipeU) {
        return <div className="ViewRecipe">No recipe found</div>;
    }

    const renderStars = () => {
        const rate = recipeU.averageRating;
        const stars = [];
        const totalStars = 5;
        const integerPart = Math.floor(rate);
        const decimalPart = rate - integerPart;
    
        for (let i = 0; i < totalStars; i++) {
            if (i < integerPart) {
                stars.push(<FaStar key={i} color="#ffc107" size={20} />);
            } else if (i === integerPart && decimalPart >= 0.8) {
                stars.push(<FaStar key={i} color="#ffc107" size={20} />);
            } else if (i === integerPart && decimalPart >= 0.4) {
                stars.push(<FaStarHalfAlt key={i} color="#ffc107" size={20} />);
            } else {
                stars.push(<FaStar key={i} color="#e4e5e9" size={20} />);
            }
        }
        return stars;
    };

    const handleClose = () => {
        closeDetailed();
      };

    const username = getUsername();

    return (
        <div className='detailedRecipeBackground'>
            <div className='detailedRecipeContainer'>
                <div className='titleBar'>
                    <button className='closeBtn' onClick={handleClose}>Close</button>
                    {/* <button className='reportBtn' onClick={openReport}>Report</button> */}
                    <LoggedInItems/>
                </div>
                <Modal size="md" isOpen={reportOpen} onRequestClose={closeReport} className="Modal" backdrop="static" maskClosable={false} shouldCloseOnOverlayClick={false}>
                    <div className='ReportModal'>
                        <h1>Describe your issue with this recipe:</h1>
                        <input type="issue" name="issue" value={issue} onChange={(e) => setIssue(e.target.value)} />
                        <button onClick={reportSubmit}>Submit</button>
                        <button onClick={closeReport}>Close</button>
                        <br/>
                        <p>{reportMessage}</p>
                    </div>
                </Modal>
                <Modal size="md" isOpen={rateOpen} onRequestClose={closeRate} className="Modal" backdrop="static" maskClosable={false} shouldCloseOnOverlayClick={false}>
                    <div className='ActionModal'> 
                        <ReactStars
                            count={5}
                            onChange={handleRating}
                            size={55}
                            activeColor="#ffd700"
                            className="ratingStars"
                        />
                        <h1>Give your feedback!</h1>
                        <input type="feedback" name="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                        <button onClick={rateSubmit}>Submit</button>
                        <br/>
                        <button onClick={closeRate}>Close</button>
                        <p>{rateMessage}</p>
                    </div>
                </Modal>
                <div className="recipeHeader">
                    <h2>
                        {recipeU && recipeU.name} Recipe
                        {/* <span className="usernameText"> by {username}</span> */}
                    </h2>
                    <div className="recipeRate">
                        <p>
                        Rate: {recipeU.averageRating.toFixed(3)} {renderStars()}
                        </p>
                    </div>
                    <div className="additionalInfo">
                        {/* <p>Prep Time: {selectedRecipe.prepTime}</p> */}
                        <p>ABV: {recipeU.alcoholByVolume.toFixed(4) * 100}%</p>
                    </div>
                </div>
                <div className="recipeContent">
                    {/* <div className="imageSection">
                        <img src={`/${selectedRecipe.image}`} alt={selectedRecipe.name}/>
                    </div> */}
                    <div className="ingredientSection">
                        <h3>Ingredients:</h3>
                        {recipeIngredients?.length > 0
                        ? (
                            <ul>
                                {recipeIngredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient.ingredientName}: {ingredient.quantity} {ingredient.quantityDescription}</li>
                                ))}
                            </ul>
                        ) : (
                            <ul>
                                <li>No Ingredients</li>
                            </ul>
                        )} 
                    </div>
                    <div className="directionSection">
                        <h3>Description:</h3>
                        {/* <ol>
                            {selectedRecipe.instructions.map((direction, index) => (
                                <li key={index}>{direction}</li>
                            ))}
                        </ol> */}
                        <p>{recipeU.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailedRecipe;