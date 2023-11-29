using System.ComponentModel.DataAnnotations;

namespace cc_api.Models.Requests
{
    public class DisplayRequest
    {
        [Required]
        public bool loggedIn { get; set; }

        [Required]
        public bool favorited { get; set; }

        [Required]
        public bool useBarIngredints { get; set; }

        public string? searchQuery { get; set; }

        public IEnumerable<string>? barIngredients { get; set; }
    }
}
