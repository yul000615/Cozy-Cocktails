import { useState, useEffect } from 'react'
import DetailedRecipe from './detailedRecipe'

const Recipes = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [recipes, setRecipes] = useState([])
    const [openDetailed, setOpenDetailed] = useState(false)
    const [recipe, setRecipe] = useState()

    const searchRecipes = async () => {
    }

    const fetchRecipe = () => {
        fetch("https://localhost:7268/api/Recipe")
        .then((response) => response.json())
        .then(data => setRecipes(data))
        .catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchRecipe()
    }, [])

    return(
        <div className = "recipes">
            <h1>Recipes</h1>

            <div className = "search">
                <input
                    placeholder = "Search by name"
                    value = {searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                    className = "button"
                    id = "searchRecipeBtn"
                    onClick={() => searchRecipes(searchTerm)
                }>Search</button>
            </div>

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
        </div>
    )
}

export default Recipes
