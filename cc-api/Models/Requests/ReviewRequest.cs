using System.ComponentModel.DataAnnotations;

namespace cc_api.Models.Requests
{
    public class ReviewRequest
    {
        public long ReviewId { get; set; }

        [Required]
        public double Rating { get; set; }

        [Required]
        public string Feedback { get; set; }

        [Required]
        public long RecipeId { get; set; }
    }
}
