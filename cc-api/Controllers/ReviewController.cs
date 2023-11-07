using cc_api.DAL;
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

        [HttpGet("getReview")]
        public IActionResult GetReview(long ID, bool userReviews)
        {
            // Gets all reviews created by user with userId ID
            if (userReviews)
            {

            }
            // Gets all reviews associated with the recipe with recipeId ID
            else
            {

            }

            return Ok();
        }

        [HttpPost("createReview")]
        public IActionResult CreateReview()
        {
            return Ok();
        }

        [HttpPut("updateReview")]
        public IActionResult UpdateReview()
        {
            return Ok();
        }

        [HttpDelete("deleteReview")]
        public IActionResult DeleteReview(long reviewID)
        {
            return Ok();
        }
    }
}
