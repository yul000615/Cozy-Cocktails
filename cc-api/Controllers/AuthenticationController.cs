using cc_api.DAL;
using cc_api.Models;
using cc_api.Models.Requests;
using cc_api.Models.Responses;
using cc_api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace cc_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IPasswordHasher _passwordHasher;
        private readonly AccessTokenGenerator _accessTokenGenerator;
        private readonly RefreshTokenGenerator _refreshTokenGenerator;
        public AuthenticationController(UnitOfWork unitOfWork, IPasswordHasher passwordHasher, AccessTokenGenerator tokenGenerator, RefreshTokenGenerator refreshTokenGenerator)
        {
            _unitOfWork = unitOfWork;
            _passwordHasher = passwordHasher;
            _accessTokenGenerator = tokenGenerator;
            _refreshTokenGenerator = refreshTokenGenerator;
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

            string accessToken = _accessTokenGenerator.GenerateToken(user);
            string refreshToken = _refreshTokenGenerator.GenerateToken(user);

            return Ok(new LoginSuccessResponse()
            {
               AccessToken = accessToken,
               RefreshToken = refreshToken
            });
        }
    }
}
