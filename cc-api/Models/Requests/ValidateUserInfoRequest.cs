using System.ComponentModel.DataAnnotations;

namespace cc_api.Models.Requests
{
    public class ValidateUserInfoRequest
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string? Password { get; set; }
        
    }
}
