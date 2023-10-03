using cc_api.DAL;
using cc_api.Models;
using cc_api.Models.Requests;
using Microsoft.AspNetCore.Mvc;

namespace cc_api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthenticationController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;

        public AuthenticationController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = new User();
            bool validUser = user != null;
            bool validPassword = validUser && (credentials.Password == user.Password);



            if (!validUser || !validPassword)
            {
                return Unauthorized();
            }

            //Generate Access Token and Refresh Token
            //Authorize roles

            return Ok();
        }

    }
}
