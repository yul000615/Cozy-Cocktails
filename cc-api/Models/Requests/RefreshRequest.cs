using System.ComponentModel.DataAnnotations;

namespace cc_api.Models.Requests
{
    public class RefreshRequest
    {
        [Required]
        public string? RefreshToken {  get; set; }
    }
}
