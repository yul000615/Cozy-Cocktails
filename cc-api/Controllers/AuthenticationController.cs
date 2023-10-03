using cc_api.DAL;
using cc_api.Models;
using cc_api.Models.Requests;
using cc_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace cc_api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthenticationController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly BCryptPasswordHasher _passwordService;
        public AuthenticationController(UnitOfWork unitOfWork, BCryptPasswordHasher passwordService)
        {
            _unitOfWork = unitOfWork;
            _passwordService = passwordService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (credentials.Email == null || credentials.Password == null)
            {
                return BadRequest();
            }

            var repository = _unitOfWork.UserRepository;
            var user = await repository.GetByEmail(credentials.Email);
            bool validUser = user != null;
            bool validPassword = validUser && (_passwordService.VerifyPassword(credentials.Password, user.Password));


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
