using System.ComponentModel.DataAnnotations;

namespace cc_api.Models.Requests
{
    public class RecipeIngredientRequest
    {
        [Required]
        public long recipeID { get; set; }
    }
}
