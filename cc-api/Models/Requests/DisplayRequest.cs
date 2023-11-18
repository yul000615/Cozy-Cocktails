using System.ComponentModel.DataAnnotations;

namespace cc_api.Models.Requests
{
    public class DisplayRequest
    {
        [Required]
        public bool loggedIn { get; set; } = false;

        [Required]
        public bool favorited { get; set; } = false;

        [Required]
        public bool useBarIngredints { get; set; } = false;

        public string searchQuery { get; set; } = "";

        public IEnumerable<string> barIngredients { get; set; } = Enumerable.Empty<string>();
    }
}
