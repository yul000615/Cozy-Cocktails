using cc_api.DAL;
using cc_api.Models;
using cc_api.Models.Requests;
using cc_api.Models.Responses;
using cc_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace cc_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ITokenGenerator _tokenGenerator;
        public AuthenticationController(UnitOfWork unitOfWork, IPasswordHasher passwordHasher, ITokenGenerator tokenGenerator)
        {
            _unitOfWork = unitOfWork;
            _passwordHasher = passwordHasher;
            _tokenGenerator = tokenGenerator;
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
            bool validPassword = validUser && (_passwordHasher.VerifyPassword(credentials.Password, user.Password));


            if (!validUser || !validPassword)
            {
                return Unauthorized();
            }

            string token = _tokenGenerator.GenerateToken(user);
            //Generate Refresh token
            //Authorize roles

            return Ok(new LoginSuccessResponse()
            {
               AccessToken = token
            });
        }

    }
}
