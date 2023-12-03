using cc_api.DAL;
using cc_api.Models;
using cc_api.Models.Requests;
using cc_api.Models.Responses;
using cc_api.Services.Tokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading.Tasks;

namespace cc_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipeController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly TokenReader _tokenReader;

        public RecipeController(UnitOfWork unitOfWork, TokenReader tokenReader)
        {
            _unitOfWork = unitOfWork;
            _tokenReader = tokenReader;
        }

        private async Task<double> _CalcABVAsync(long recipeID)
        {
            IEnumerable<RecipeIngredient> recipeIngredients = await _unitOfWork.RecipeIngredientRepository.GetByRecipeID(recipeID);

            double total_vol = 0.0;
            double alcohol_vol = 0.0;
            /* Must be updated to account for dilution resulting from ice and mixing process */
            /* Mixing method, shaken, stirred, over ice, etc, must be added to recipe model */
            foreach (RecipeIngredient ri in recipeIngredients)
            {
                Ingredient ingredient;
                switch (ri.QuantityDescription)
                {
                    case "oz":
                        ingredient = _unitOfWork.IngredientRepository.GetByPrimaryKey(ri.IngredientName);
                        alcohol_vol += ri.Quantity * ingredient.AlcoholByVolume;
                        total_vol += ri.Quantity;
                        break;
                    case "dash":
                        ingredient = _unitOfWork.IngredientRepository.GetByPrimaryKey(ri.IngredientName);
                        double ozQuantity = ri.Quantity * 0.03125;
                        alcohol_vol += ozQuantity * ingredient.AlcoholByVolume;
                        total_vol += ozQuantity;
                        break;
                    default:
                        break;
                }
            }

            if (total_vol == 0.0)
            {
                return 0.0;
            }

            return alcohol_vol / total_vol;
        }

        [HttpPost("getRecipeIngredients")]
        public async Task<IActionResult> GetRecipeIngredients([FromBody] RecipeIngredientRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            IEnumerable<RecipeIngredient> RIs = await _unitOfWork.RecipeIngredientRepository.GetByRecipeID(request.recipeID);

            return Ok(RIs);
        }

        [HttpPost("getRecipesBasic")]
        public async Task<IActionResult> GetRecipesBasic([FromBody] DisplayRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (!string.IsNullOrEmpty(request.searchQuery))
            {
                return Ok(await _unitOfWork.RecipeRepository.GetByName(request.searchQuery));
            }
            else
            {
                return Ok(_unitOfWork.RecipeRepository.GetAll());
            }
        }

        [HttpPost("getRecipes")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetRecipes([FromBody] DisplayRequest request, [FromHeader] string authorization)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            bool tokenExtracted = _tokenReader.GetTokenFromHeader(authorization, out var token);
            if (!tokenExtracted)
            {
                return Unauthorized();
            }

            var tokenUserInfo = _tokenReader.ReadToken(token);
            IList<Recipe> foundRecipes = new List<Recipe>();

            if (request.favorited)
            {
                IEnumerable<UserFavoriteRecipe> UFRs = await _unitOfWork.UserFavoriteRecipeRepository.GetByUserID(tokenUserInfo.Id);
                if (!UFRs.Any())
                {
                    return Ok(foundRecipes);
                }
                foreach (UserFavoriteRecipe UFR in UFRs)
                {
                    foundRecipes.Add(_unitOfWork.RecipeRepository.GetByPrimaryKey(UFR.RecipeId));
                }
            }

            if (!string.IsNullOrEmpty(request.searchQuery))
            {
                IEnumerable<Recipe> queryResults = await _unitOfWork.RecipeRepository.GetByName(request.searchQuery);
                if (!queryResults.Any())
                {
                    return Ok(queryResults);
                }
                if (request.favorited)
                {
                    foundRecipes = foundRecipes.Intersect(queryResults).ToList();
                }
                else
                {
                    foundRecipes = queryResults.ToList();
                }
            }else
            {
                if (!request.favorited)
                {
                    foundRecipes = _unitOfWork.RecipeRepository.GetAll().ToList();
                }
            }

            if (request.useBarIngredients)
            {
                if (!foundRecipes.Any())
                {
                    return Ok(foundRecipes);
                }

                HashSet<Ingredient> barIngredients = new HashSet<Ingredient>();
                IEnumerable<UserBarIngredient> UBIs = await _unitOfWork.UserBarIngredientRepository.GetByUserID(tokenUserInfo.Id);
                foreach (UserBarIngredient UBI in UBIs)
                {
                    barIngredients.Add(_unitOfWork.IngredientRepository.GetByPrimaryKey(UBI.IngredientName));
                }

                List<Recipe> temp = foundRecipes.ToList();
                foreach (Recipe recipe in foundRecipes)
                {
                    IEnumerable<RecipeIngredient> RIs = await _unitOfWork.RecipeIngredientRepository.GetByRecipeID(recipe.RecipeId);
                    foreach (RecipeIngredient RI in RIs)
                    {
                        if (!barIngredients.Contains(_unitOfWork.IngredientRepository.GetByPrimaryKey(RI.IngredientName)))
                        {
                            temp.Remove(recipe);
                            break;
                        }
                    }
                }
                foundRecipes = foundRecipes.Intersect(temp).ToList();
            }

            return Ok(foundRecipes);
        }

        [HttpPost("createRecipe")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CreateRecipe([FromBody] RecipeRequest request, [FromHeader] string authorization) /* PostMethod */
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            bool tokenExtracted = _tokenReader.GetTokenFromHeader(authorization, out var token);
            if (!tokenExtracted)
            {
                return Unauthorized();
            }

            var tokenUserInfo = _tokenReader.ReadToken(token);

            Recipe recipe = new Recipe()
            {
                Name = request.name,
                Description = request.description,
                UserAuthor = tokenUserInfo.Id,
            };

            _unitOfWork.RecipeRepository.Insert(recipe);
            _unitOfWork.Save();

            for (int i = 0; i < request.ingredientNames.Count(); i++)
            {
                RecipeIngredient ri = new RecipeIngredient()
                {
                    Quantity = request.quantities.ElementAt(i),
                    QuantityDescription = request.quantityDescriptions.ElementAt(i),
                    RecipeId = recipe.RecipeId,
                    IngredientName = request.ingredientNames.ElementAt(i)
                    
                };

                _unitOfWork.RecipeIngredientRepository.Insert(ri);
                _unitOfWork.Save();
            }

            recipe.AlcoholByVolume = await _CalcABVAsync(recipe.RecipeId);
            _unitOfWork.RecipeRepository.Update(recipe);
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
