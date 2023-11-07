using System.ComponentModel.DataAnnotations;

namespace cc_api.Models.Requests
{
    public class FavoriteRequest
    {
        [Required]
        public long userID { get; set; }

        [Required]
        public long recipeID { get; set; }

    }
}
