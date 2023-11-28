using cc_api.DAL;
using cc_api.Models;
using cc_api.Models.Requests;
using cc_api.Models.Responses;
using cc_api.Services.Tokens;
using Microsoft.AspNetCore.Authorization;
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
                switch (ri.QuantityDescription)
                {
                    case "oz":
                        Ingredient ingredient = _unitOfWork.IngredientRepository.GetByPrimaryKey(ri.IngredientName);
                        alcohol_vol += ri.Quantity * ingredient.AlcoholByVolume;
                        total_vol += ri.Quantity;
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

        // Delete this method later
        [HttpGet]
        public IActionResult GetRecipes()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(_unitOfWork.RecipeRepository.GetAll());
        }

        [HttpPost("getRecipeIngredients")]
        public async Task<IActionResult> GetRecipeIngredients([FromBody] long recipeID)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            IEnumerable<RecipeIngredient> RIs = await _unitOfWork.RecipeIngredientRepository.GetByRecipeID(recipeID);

            return Ok(RIs);
        }

        [HttpPost("getRecipes")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetRecipes([FromBody] DisplayRequest request, [FromHeader] string authorization)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            TokenUserInfo? tokenUserInfo = null;
            IEnumerable<Recipe> foundRecipes = new List<Recipe> ();

            if (request.favorited)
            {
                bool tokenExtracted = _tokenReader.GetTokenFromHeader(authorization, out var token);
                if (!tokenExtracted)
                {
                    return Unauthorized();
                }

                tokenUserInfo = _tokenReader.ReadToken(token);
                IEnumerable<UserFavoriteRecipe> UFRs = await _unitOfWork.UserFavoriteRecipeRepository.GetByUserID(tokenUserInfo.Id);
                foreach (UserFavoriteRecipe UFR in UFRs)
                {
                    foundRecipes.Append(_unitOfWork.RecipeRepository.GetByPrimaryKey(UFR.RecipeId));
                }
            }

            if (!string.IsNullOrEmpty(request.searchQuery))
            {
                if (request.favorited)
                {
                    if (!foundRecipes.Any())
                    {
                        return NoContent();
                    }

                    List<Recipe> temp = new List<Recipe>();
                    foreach (Recipe recipe in foundRecipes)
                    {
                        if (recipe.Name.Contains(request.searchQuery))
                        {
                            temp.Add(recipe);
                        }
                    }
                    foundRecipes = temp;
                }
                else
                {
                    foundRecipes = await _unitOfWork.RecipeRepository.GetByName(request.searchQuery);
                }
            }else
            {
                if (!request.favorited)
                {
                    foundRecipes = _unitOfWork.RecipeRepository.GetAll();
                }
            }

            if (request.useBarIngredints)
            {
                if (!foundRecipes.Any())
                {
                    return NoContent();
                }

                HashSet<Ingredient> barIngredients = new HashSet<Ingredient>();

                if (request.loggedIn)
                {
                    if (tokenUserInfo == null)
                    {
                        bool tokenExtracted = _tokenReader.GetTokenFromHeader(authorization, out var token);
                        if (!tokenExtracted)
                        {
                            return Unauthorized();
                        }

                        tokenUserInfo = _tokenReader.ReadToken(token);
                    }

                    IEnumerable<UserBarIngredient> UBIs = await _unitOfWork.UserBarIngredientRepository.GetByUserID(tokenUserInfo.Id);
                    foreach (UserBarIngredient UBI in UBIs)
                    {
                        barIngredients.Add(_unitOfWork.IngredientRepository.GetByPrimaryKey(UBI.IngredientName));
                    }

                }else
                {
                    foreach (string ingredient in request.barIngredients)
                    {
                        barIngredients.Add(_unitOfWork.IngredientRepository.GetByPrimaryKey(ingredient));
                    }
                }

                List<Recipe> temp = new List<Recipe>();
                foreach (Recipe recipe in foundRecipes)
                {
                    bool includeRecipe = true;
                    IEnumerable<RecipeIngredient> RIs = await _unitOfWork.RecipeIngredientRepository.GetByRecipeID(recipe.RecipeId);
                    foreach (RecipeIngredient RI in RIs)
                    {
                        if (!barIngredients.Contains(_unitOfWork.IngredientRepository.GetByPrimaryKey(RI.IngredientName)))
                        {
                            includeRecipe = false; break;
                        }
                    }
                    if (includeRecipe) { temp.Add(recipe); }
                }
                foundRecipes = temp;
            }

            return Ok(foundRecipes);
            //return foundRecipes.Any() != true ? NoContent() : Ok(foundRecipes);
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
                    IngredientName = request.ingredientNames.ElementAt(i),
                    RecipeId = recipe.RecipeId
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
