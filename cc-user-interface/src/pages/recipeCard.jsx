import React from 'react'
import DetailedRecipe from './detailedRecipe'

const RecipeCard = ({ recipe }) => {
    return(
        <div className = 'recipeCard'>
            <>
                <h4>{recipe.name}</h4>
                <button onClick = {() => {
                    DetailedRecipe(true, recipe)
                }}>
                    View
                </button>
            </>
        </div>
    )
}

export default RecipeCard