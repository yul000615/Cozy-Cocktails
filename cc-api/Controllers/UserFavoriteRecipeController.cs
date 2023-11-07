using cc_api.DAL;
using cc_api.Models;
using cc_api.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace cc_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserFavoriteRecipeController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;

        public UserFavoriteRecipeController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("getFavorites")]
        [Authorize(Roles = "User, Admin, etc")] // IDK if this is how roles is supposed to work?
        public async Task<IActionResult> GetFavorites()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            
            var handler = new JwtSecurityTokenHandler();
            var authHeader = Request.Headers["Authorization"];
            var token = handler.ReadJwtToken(authHeader);
            var ID = token.Claims.First(claim => claim.Type == "UserId").Value;

            return Ok(await _unitOfWork.UserFavoriteRecipeRepository.GetByUserID(long.Parse(ID)));
        }

        [HttpPost("favorite")]
        public IActionResult FavoriteRecipe([FromBody] FavoriteRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            UserFavoriteRecipe UFR = new UserFavoriteRecipe()
            {
                UserId = request.userID,
                RecipeId = request.recipeID
            };

            _unitOfWork.UserFavoriteRecipeRepository.Insert(UFR);
            _unitOfWork.Save();

            return Ok("Recipe Favorited");
        }

        [HttpDelete("unfavorite")]
        public IActionResult UnfavoriteRecipe(long favID)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            UserFavoriteRecipe UFR = _unitOfWork.UserFavoriteRecipeRepository.GetByPrimaryKey(favID);
            if (UFR == null)
            {
                return NotFound();
            }

            _unitOfWork.UserFavoriteRecipeRepository.Delete(favID);
            _unitOfWork.Save();

            return Ok("Favorite removed");
        }
    }
}
