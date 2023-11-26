using System.ComponentModel.DataAnnotations;

namespace cc_api.Models.Requests
{
    public class BarIngredientRequest
    {
        [Required]
        public required string ingredientName { get; set; }
    }
}
