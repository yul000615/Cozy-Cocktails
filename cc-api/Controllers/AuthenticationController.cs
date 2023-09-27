using cc_api.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace cc_api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthenticationController : ControllerBase
    {
        private readonly CozyCocktailsContext _context;

        public AuthenticationController(CozyCocktailsContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            //replace with repository Get
            User user = new User();
            bool validUser = user != null;
            bool validPassword = validUser && (credentials.Password == user.Password);


            if (!validUser || !validPassword)
            {
                return Unauthorized();
            }

            //Generate Access Token and Refresh Token

            return Ok();
        }

        public class LoginRequest
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            [StringLength(100, MinimumLength = 6)]
            public string Password { get; set; }
        }
    }
}
