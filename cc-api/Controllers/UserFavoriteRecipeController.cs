using cc_api.DAL;
using cc_api.Models;
using cc_api.Models.Requests;
using cc_api.Services.Tokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetUserFavorites()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            TokenUserInfo tokenUserInfo = new TokenReader().ReadToken(Request.Headers["Authorization"]);

            IEnumerable<UserFavoriteRecipe> UFRs = await _unitOfWork.UserFavoriteRecipeRepository.GetByUserID(tokenUserInfo.Id);

            return UFRs == null ? NoContent() : Ok(UFRs);
        }

        [HttpPost("getFavorited")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> getFavorited([FromBody] FavoriteRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            TokenUserInfo tokenUserInfo = new TokenReader().ReadToken(Request.Headers["Authorization"]);

            UserFavoriteRecipe UFR = await _unitOfWork.UserFavoriteRecipeRepository.GetByContent(tokenUserInfo.Id, request.recipeID);

            return UFR == null ? NoContent() : Ok(UFR);
        }

        [HttpPost("favorite")]
        [Authorize(Roles = "User")]
        public IActionResult FavoriteRecipe([FromBody] FavoriteRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            TokenUserInfo tokenUserInfo = new TokenReader().ReadToken(Request.Headers["Authorization"]);

            UserFavoriteRecipe UFR = new UserFavoriteRecipe()
            {
                UserId = tokenUserInfo.Id,
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
