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
    public class ReviewController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly TokenReader _tokenReader;

        public ReviewController(UnitOfWork unitOfWork, TokenReader tokenReader)
        {
            _unitOfWork = unitOfWork;
            _tokenReader = tokenReader;
        }

        private async Task<double> _CalcAverageRating(long recipeID)
        {
            Recipe recipe = _unitOfWork.RecipeRepository.GetByPrimaryKey(recipeID);
            IEnumerable<Review> recipeReviews = await _unitOfWork.ReviewRepository.GetByRecipeID(recipeID);
            
            double totalRating = 0.0;

            if (!recipeReviews.Any())
            {
                return totalRating;
            }

            foreach (Review review in recipeReviews)
            {
                totalRating += review.Rating;
            }

            return totalRating / recipeReviews.Count();
        }

        [HttpGet("getRecipeReviews")]
        public async Task<IActionResult> GetRecipeReviews(long recipeID)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(await _unitOfWork.ReviewRepository.GetByRecipeID(recipeID));
        }

        [HttpGet("getUserReviews")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetUserReviews([FromHeader] string authorization)
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

            return Ok(await _unitOfWork.ReviewRepository.GetByUserID(tokenUserInfo.Id));
        }


        [HttpGet("getReviewed")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetReviewed(long recipeID, [FromHeader] string authorization)
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

            Review review = await _unitOfWork.ReviewRepository.GetByContent(tokenUserInfo.Id, recipeID);
            return review == null ? NoContent() : Ok(review);
        }

        [HttpPost("createReview")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> CreateReview([FromBody] ReviewRequest request, [FromHeader] string authorization)
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

            Review review = new Review()
            {
                Rating = request.Rating,
                Feedback = request.Feedback,
                DateTime = DateTime.Now.ToString(),
                RecipeId = request.RecipeId,
                UserId = tokenUserInfo.Id
            };

            _unitOfWork.ReviewRepository.Insert(review);
            _unitOfWork.Save();

            Recipe recipe = _unitOfWork.RecipeRepository.GetByPrimaryKey(request.RecipeId);
            recipe.AverageRating = await _CalcAverageRating(recipe.RecipeId);
            _unitOfWork.RecipeRepository.Update(recipe);
            _unitOfWork.Save();

            return Ok(review);
        }

        [HttpPut("updateReview")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> UpdateReview([FromBody] ReviewRequest request, [FromHeader] string authorization)
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

            Review review = await _unitOfWork.ReviewRepository.GetByContent(tokenUserInfo.Id, request.RecipeId);
            if (review == null)
            {
                return NotFound();
            }

            review.Rating = request.Rating;
            review.Feedback = request.Feedback;
            review.DateTime = DateTime.Now.ToString();

            _unitOfWork.ReviewRepository.Update(review);
            _unitOfWork.Save();

            Recipe recipe = _unitOfWork.RecipeRepository.GetByPrimaryKey(request.RecipeId);
            recipe.AverageRating = await _CalcAverageRating(recipe.RecipeId);
            _unitOfWork.RecipeRepository.Update(recipe);
            _unitOfWork.Save();

            return Ok();
        }

        [HttpDelete("deleteReview")]
        public IActionResult DeleteReview(long reviewID)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Review review = _unitOfWork.ReviewRepository.GetByPrimaryKey(reviewID);
            if (review == null)
            {
                return NotFound();
            }

            _unitOfWork.ReviewRepository.Delete(review);
            _unitOfWork.Save();

            return Ok();
        }
    }
}
