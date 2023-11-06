import React from 'react'

const DetailedRecipe = ({ closeDetailed, recipe }) => {
    return(
        <div className='detailedRecipeBackground'>
            <div className='detailedRecipeContainer'>
                <div className='title'>
                    <h1>Detailed View: {recipe.name}</h1>
                </div>

                <div className='body'>
                    <p>{recipe.description}</p>
                </div>

                <div className='footer'>
                <button onClick={() => closeDetailed(false)}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default DetailedRecipe
