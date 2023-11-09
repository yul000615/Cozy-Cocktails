using cc_api.DAL;
using cc_api.Models;
using cc_api.Models.Requests;
using cc_api.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace cc_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipeController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;

        public RecipeController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        private async Task<double> _CalcABVAsync(long recipeID)
        {
            IRecipeIngredientRepository recipeIngredient = _unitOfWork.RecipeIngredientRepository;
            IIngredientRepository ingredient = _unitOfWork.IngredientRepository;
            IEnumerable<RecipeIngredient> recipeIngredients = await recipeIngredient.GetByRecipeID(recipeID);

            double total_vol = 0.0;
            double alcohol_vol = 0.0;
            /* Must be updated to account for dilution resulting from ice and mixing process */
            /* Mixing method, shaken, stirred, over ice, etc, must be added to recipe model */
            foreach (RecipeIngredient ri in recipeIngredients)
            {
                switch (ri.QuantityDescription)
                {
                    case "oz":
                        alcohol_vol += ri.Quantity * ingredient.GetByPrimaryKey(ri.IngredientName).AlcoholByVolume;
                        total_vol += ri.Quantity;
                        break;
                    default:
                        break;
                }
            }

            return alcohol_vol / total_vol * 100;
        }

        [HttpGet]
        public IActionResult GetRecipes()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(_unitOfWork.RecipeRepository.GetAll());
        }

        [HttpPost("getRecipes")]
        public async Task<IActionResult> Display([FromBody] DisplayRequest request) /* GetMethod */
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Recipe recipe = _unitOfWork.RecipeRepository.GetByPrimaryKey(request.ID);
            if (recipe == null)
            {
                return NotFound();
            }

            double abv = await _CalcABVAsync(request.ID);

            return Ok(new DisplayRecipeResponse()
            {
                displayRecipe = recipe,
                displayABV = abv
            });
        }

        [HttpPost("createRecipe")]
        public IActionResult CreateRecipe([FromBody] RecipeRequest request) /* PostMethod */
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Recipe recipe = new Recipe()
            {
                Name = request.name,
                Description = request.description,
                UserAuthor = request.authorID,
                UserAuthorNavigation = _unitOfWork.UserRepository.GetByPrimaryKey(request.authorID)
            };

            for (int i = 0; i < request.ingredientNames.Count(); i++ )
            {
                string _ingredientName = request.ingredientNames.ElementAt(i);
                RecipeIngredient ri = new RecipeIngredient()
                {
                    Quantity = request.quantites.ElementAt(i),
                    QuantityDescription = request.quantityDescriptions.ElementAt(i),
                    RecipeId = recipe.RecipeId,
                    IngredientName = _ingredientName,
                    IngredientNameNavigation = _unitOfWork.IngredientRepository.GetByPrimaryKey(_ingredientName),
                    Recipe = recipe
                };

                _unitOfWork.RecipeIngredientRepository.Insert(ri);
                recipe.RecipeIngredients.Add(ri);
            }

            _unitOfWork.RecipeRepository.Insert(recipe);
            _unitOfWork.Save();

            return Ok("Recipe Created");
        }

        [HttpPut("updateRecipe")] /* Placeholder Method */
        public IActionResult UpdateRecipe(Recipe recipe) /* PutMethod */
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            _unitOfWork.RecipeRepository.Update(recipe);
            _unitOfWork.Save();

            return Ok("Recipe Updated");
        }

        [HttpDelete("deleteRecipe")]
        public async Task<IActionResult> DeleteRecipe(long recipeID)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Recipe recipe = _unitOfWork.RecipeRepository.GetByPrimaryKey(recipeID);
            if (recipe == null)
            {
                return NotFound();
            }

            IEnumerable<RecipeIngredient> recipeIngredients = 
                await _unitOfWork.RecipeIngredientRepository.GetByRecipeID(recipeID);
            foreach (RecipeIngredient recipeIngredient in recipeIngredients)
            {
                _unitOfWork.RecipeIngredientRepository.Delete(recipeIngredient);
            }

            IEnumerable<Review> reviews = 
                await _unitOfWork.ReviewRepository.GetByRecipeID(recipeID);
            foreach (Review review in reviews)
            {
                _unitOfWork.ReviewRepository.Delete(review);
            }

            IEnumerable<Report> reports = 
                await _unitOfWork.ReportRepository.GetByRecipeID(recipeID);
            foreach (Report report in reports)
            {
                _unitOfWork.ReportRepository.Delete(report);
            }

            IEnumerable<UserFavoriteRecipe> userFavoriteRecipes = 
                await _unitOfWork.UserFavoriteRecipeRepository.GetByRecipeID(recipeID);
            foreach (UserFavoriteRecipe UFR in userFavoriteRecipes)
            {
                _unitOfWork.UserFavoriteRecipeRepository.Delete(UFR);
            }

            _unitOfWork.RecipeRepository.Delete(recipe);
            _unitOfWork.Save();

            return Ok("Recipe Deleted");
        }
    }
}
