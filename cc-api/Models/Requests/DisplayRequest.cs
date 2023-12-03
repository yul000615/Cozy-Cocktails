using System.ComponentModel.DataAnnotations;

namespace cc_api.Models.Requests
{
    public class DisplayRequest
    {
        [Required]
        public bool favorited { get; set; }

        [Required]
        public bool useBarIngredients { get; set; }

        public string? searchQuery { get; set; }
    }
}
