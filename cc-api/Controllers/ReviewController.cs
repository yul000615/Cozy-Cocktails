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
    public class ReviewController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;

        public ReviewController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
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
        public async Task<IActionResult> GetUserReviews()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            TokenUserInfo tokenUserInfo = new TokenReader().ReadToken(Request.Headers["Authorization"]);
            return Ok(await _unitOfWork.ReviewRepository.GetByUserID(tokenUserInfo.Id));
        }


        [HttpGet("getReviewed")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetReviewed(long recipeID)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            TokenUserInfo tokenUserInfo = new TokenReader().ReadToken(Request.Headers["Authorization"]);
            Review review = await _unitOfWork.ReviewRepository.GetByContent(tokenUserInfo.Id, recipeID);
            return review == null ? NoContent() : Ok(review);
        }

        [HttpPost("createReview")]
        [Authorize(Roles = "User")]
        public IActionResult CreateReview([FromBody] ReviewRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            TokenUserInfo tokenUserInfo = new TokenReader().ReadToken(Request.Headers["Authorization"]);

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

            return Ok("Review created");
        }

        [HttpPut("updateReview")]
        public IActionResult UpdateReview([FromBody] ReviewRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Review review = _unitOfWork.ReviewRepository.GetByPrimaryKey(request.ReviewId);
            if (review == null)
            {
                return NotFound("Could not find that review");
            }

            review.Rating = request.Rating;
            review.Feedback = request.Feedback;
            review.DateTime = DateTime.Now.ToString();

            _unitOfWork.ReviewRepository.Update(review);
            _unitOfWork.Save();

            return Ok("Recipe updated");
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

            return Ok("Review removed");
        }
    }
}
