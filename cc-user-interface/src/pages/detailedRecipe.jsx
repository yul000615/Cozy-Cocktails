import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { useContext } from 'react';
import './detailedRecipe.css';
import Modal from 'react-modal';
import Heart from "react-animated-heart";
import AppContext from '../AppContext';
import ReactStars from "react-rating-stars-component";

const recipeDetails = {
    'Long Island Iced Tea': {
        name: 'Long Island Iced Tea',
        ingredients: ['Vodka', 'White rum','Gin', 'Triple sec', 'Lemon juice', 'Syrup', 'Cola', 'Lemon wedge'],
        description: 'A cocktail',
        prepTime: '10 minutes',
        ABV: '15%',
        rate: 3.9,
        reviewCount: 25,
        image: 'long_island_ice_tea.jpeg',
    },
    'Margarita': {
        name: 'Margarita',
        ingredients: ['Gin', 'Tonic water', 'Lime', 'Ice'],
        description: 'A cocktail',
        prepTime: '10 minutes',
        ABV: '23.6%',
        rate: 4.8,
        reviewCount: 20,
        image: 'margarita.jpeg',
    },
    'Martini': {
        name: 'Martini',
        ingredients: ['Vodka', 'Olive juice', 'Dry Vermouth'],
        description: 'A cocktail',
        prepTime: '5 minutes',
        ABV: '30.4%',
        rate: 4.5,
        reviewCount: 20,
        image: 'martini.jpeg',
    },
    'Mojito': {
        name: 'Mojito',
        ingredients: ['Lime juice', 'Mint leaves', 'White rum', 'Soda water', 'Sugar'],
        description: 'A cocktail',
        prepTime: '10 minutes',
        ABV: '20.3%',
        rate: 4.9,
        reviewCount: 20,
        image: 'mojito.jpeg',
    },
    'Bloody Mary': {
        name: 'Bloody Mary',
        ingredients: ['Vodka', 'Tomato juice', 'Lemon juice', 'Worcestershire sauce', 'Tabasco sauce', 'Salt', 'Black pepper', 'Celery stalk'],
        description: 'A cocktail',
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

const DetailedRecipe = ({ closeDetailed, recipe }) => {
var loggedIn;
const context = useContext(AppContext);
loggedIn = (context.token !== 'no token'  && context.token !== '');
console.log(context.token);
const [issue, setIssue] = useState("");
const [feedback, setFeedback] = useState("");
const [reportOpen, setReportOpen] = useState(false);
const [rateOpen, setRateOpen] = useState(false);
console.log(rateOpen);
const [rateMessage, setRateMessage] = useState("");
const [reportMessage, setReportMessage] = useState("");
const [rating, setRating] = useState(0);

const [favorited, setFavorited] = useState(null);
function LoggedInItems (){
    if (!loggedIn){
        return null;
    } else{
        return (
        <>
        <Heart hidden={!loggedIn} isClick={favorited} onClick={favoriteClick} />
        <button className="actionBtn" onClick={openRate}>Rate</button>
        </>
        );
    }
}

function openReport(){
    setReportOpen(true);
}

function closeReport(){
    setReportOpen(false);
    setReportMessage('');
}

function rateSubmit(){
    console.log(rating)
    if (rating==0) {
        setRateMessage('Must give a rating');
    } else if (feedback.length ===0){
        setRateMessage('Must leave a feedback message');
    } else {
        //insert backend logic for rating here and run the below if successful
        setRateMessage('')
        setRateOpen(false);
    }
}

function openRate(){
    setRateOpen(true);
    setRating(0);
}

function closeRate(){
    setRateOpen(false);
    setRateMessage('');
}

function reportSubmit(){
    if (issue.length===0) {
        setReportMessage('Must enter an issue before submitting');
    } else{
        setReportMessage('Thank you! We will review your report shortly.')
    }
}
function favoriteClick(){
    if (favorited) {
        //make backend call to remove the favorite and set the heart to grey if successful
        fetch("https://localhost:7268/api/UserFavoriteRecipe/unfavorite", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                favID: favorited.listId
            }),
        })
        .then(
            response => response.json(),
            error => console.log("Error: ", error)
        )
        .then(
            data => console.log(data),
            setFavorited(null)
        )
    } else {
        //make backend call to add to favorites and set the heart to red if successful
        fetch("https://localhost:7268/api/UserFavoriteRecipe/favorite", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${context.accessToken}`
            },
            body: JSON.stringify({
                recipeID: recipe.recipeId
            }),
        })
        .then(
            response => response.json(),
            error => console.log("Error: ", error)
        )
        .then(
            data => setFavorited(data)
        )
    }
}

const handleRating = (rate) => {
    setRating(rate)

    // other logic
  }

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

    const username = getUsername();

    return (
        <div className='detailedRecipeBackground'>
            <div className='detailedRecipeContainer'>
                <div className='body'>
                    <p>{selectedRecipe.description}</p>
                </div>
                <Modal size="md" isOpen={reportOpen} onRequestClose={closeReport} className="Modal" backdrop="static" maskClosable={false} shouldCloseOnOverlayClick={false}>
                    <div className='ActionModal'>
                        <h1>Describe your issue with this recipe:</h1>
                        <input type="issue" name="issue" value={issue} onChange={(e) => setIssue(e.target.value)} />
                        <button onClick={reportSubmit}>Submit</button>
                        <br/>
                        <button onClick={closeReport}>Close</button>
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
                        {selectedRecipe && selectedRecipe.name} Recipe
                        <span className="usernameText"> by {username}</span>
                    </h2>
                    <div className="recipeRate">
                        <p>
                        {/*can add if we want to add review count {selectedRecipe.reviewCount} Reviews |  */}
                        Rate: {selectedRecipe.rate} {renderStars()}
                        </p>
                    </div>
                    <div className="additionalInfo">
                        {/* <p>Prep Time: {selectedRecipe.prepTime}</p> */}
                        <p>ABV: {selectedRecipe.ABV}</p>
                    </div>
                    <div className="actionBtns">
                        <LoggedInItems/>
                        <button className='actionBtn' onClick={openReport}>Report</button>
                    </div>
                </div>
                <div className="recipeContent">
                    {/* <div className="imageSection">
                        <img src={`/${selectedRecipe.image}`} alt={selectedRecipe.name}/>
                    </div> */}
                    <div className="ingredientSection">
                        <h3>Ingredients:</h3>
                        <ul>
                            {selectedRecipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="directionSection">
                        <h3>Description:</h3>
                        {/* <ol>
                            {selectedRecipe.instructions.map((direction, index) => (
                                <li key={index}>{direction}</li>
                            ))}
                        </ol> */}
                        <p>{selectedRecipe.description}</p>
                    </div>
                </div>
                <div className='footer'>
                    <Link to="/recipeList">
                        <button>Close</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DetailedRecipe;