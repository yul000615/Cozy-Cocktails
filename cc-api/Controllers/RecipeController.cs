using cc_api.DAL;
using cc_api.Models;
using cc_api.Models.Requests;
using cc_api.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        private async Task<double> CalcABVAsync(long recipeID)
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

        [HttpPost("display")]
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

            double abv = await CalcABVAsync(request.ID);

            return Ok(new DisplayRecipeResponse()
            {
                displayRecipe = recipe,
                displayABV = abv
            });
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody] RecipeRequest request) /* PostMethod */
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

            return Ok("Recipe Created!");
        }

        [HttpPut("update")] /* Placeholder Method */
        public IActionResult Update(Recipe recipe) /* PutMethod */
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            _unitOfWork.RecipeRepository.Update(recipe);
            _unitOfWork.Save();

            return Ok();
        }

        [HttpDelete("delete")] /* Placeholder Method */
        public IActionResult Delete(int recipeID) /* DeleteMethod */
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

            _unitOfWork.RecipeRepository.Delete(recipe);
            _unitOfWork.Save();

            return Ok();
        }
    }
}
