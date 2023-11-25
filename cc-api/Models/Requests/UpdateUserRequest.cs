using System.ComponentModel.DataAnnotations;

namespace cc_api.Models.Requests
{
    public class UpdateUserRequest
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [EmailAddress]
        public string? NewEmail { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string? NewPassword { get; set; }
    }
}