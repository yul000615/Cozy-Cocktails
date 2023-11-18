using System.ComponentModel.DataAnnotations;

namespace cc_api.Models.Requests
{
    public class FavoriteRequest
    {
        [Required]
        public long recipeID { get; set; }

    }
}
