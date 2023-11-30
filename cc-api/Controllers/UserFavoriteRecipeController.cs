using cc_api.DAL;
using cc_api.Models;
using cc_api.Models.Requests;
using cc_api.Services.Tokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace cc_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserFavoriteRecipeController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly TokenReader _tokenReader;

        public UserFavoriteRecipeController(UnitOfWork unitOfWork, TokenReader tokenReader)
        {
            _unitOfWork = unitOfWork;
            _tokenReader = tokenReader;
        }

        [HttpGet("getFavorites")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetUserFavorites([FromHeader] string authorization)
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

            IEnumerable<UserFavoriteRecipe> UFRs = await _unitOfWork.UserFavoriteRecipeRepository.GetByUserID(tokenUserInfo.Id);

            return UFRs == null ? NoContent() : Ok(UFRs);
        }

        [HttpPost("getFavorited")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> getFavorited([FromBody] FavoriteRequest request, [FromHeader] string authorization)
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

            UserFavoriteRecipe UFR = await _unitOfWork.UserFavoriteRecipeRepository.GetByContent(tokenUserInfo.Id, request.recipeID);

            return Ok(UFR);
        }

        [HttpPost("favorite")]
        [Authorize(Roles = "User")]
        public IActionResult FavoriteRecipe([FromBody] FavoriteRequest request, [FromHeader] string authorization)
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

            UserFavoriteRecipe UFR = new UserFavoriteRecipe()
            {
                UserId = tokenUserInfo.Id,
                RecipeId = request.recipeID
            };

            _unitOfWork.UserFavoriteRecipeRepository.Insert(UFR);
            _unitOfWork.Save();

            return Ok(UFR);
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

            _unitOfWork.UserFavoriteRecipeRepository.Delete(UFR);
            _unitOfWork.Save();

            return Ok(UFR);
        }
    }
}
