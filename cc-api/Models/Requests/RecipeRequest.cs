using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace cc_api.Models.Requests
{
    public class RecipeRequest
    {
        [Required]
        [MaxLength(50)]
        public string name { get; set; }

        [MaxLength(1000)]
        public string? description { get; set; }

        [Required]
        public ICollection<string> ingredientNames { get; set; }

        [Required]
        public ICollection<double> quantities { get; set; }

        [Required]
        public ICollection<string> quantityDescriptions { get; set; }
    }
}
