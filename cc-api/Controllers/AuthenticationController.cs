using cc_api.DAL;
using cc_api.Models;
using cc_api.Models.Requests;
using cc_api.Models.Responses;
using cc_api.Services;
using cc_api.Services.Tokens;
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
        private readonly Authenticator _authenticator;
        private readonly RefreshTokenValidator _refreshTokenValidator;

        public AuthenticationController(UnitOfWork unitOfWork, IPasswordHasher passwordHasher, Authenticator authenticator, RefreshTokenValidator refreshTokenValidator)
        {
            _unitOfWork = unitOfWork;
            _passwordHasher = passwordHasher;
            _authenticator = authenticator;
            _refreshTokenValidator = refreshTokenValidator;
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

            var userRepository = _unitOfWork.UserRepository;
            var user = await userRepository.GetByEmail(credentials.Email);
            bool validUser = user != null;
            bool validPassword = validUser && (_passwordHasher.VerifyPassword(credentials.Password, user.Password));

            if (!validUser || !validPassword)
            {
                return Unauthorized();
            }

            AuthenticatedUserResponse response = _authenticator.Authenticate(user);
            string refreshToken = _authenticator.CreateAndSaveRefreshToken(user);
            var cookieOptions = new CookieOptions()
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(10)
            };
            
            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
            return Ok(response);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (refreshToken == null)
            {
                return BadRequest();
            }

            bool isValidRefreshToken = _refreshTokenValidator.Validate(refreshToken);
            if (!isValidRefreshToken)
            {
                return Unauthorized();
            }

            var refreshTokenRepository = _unitOfWork.RefreshTokenRepository;
            RefreshToken refreshTokenDto = await refreshTokenRepository.GetByToken(refreshToken);
            if (refreshTokenDto == null)
            {
                return Unauthorized();
            }

            var userRepository = _unitOfWork.UserRepository;
            User user = userRepository.GetByPrimaryKey(refreshTokenDto.UserId);
            if (user == null)
            {
                return Unauthorized();
            }

            //Delete used refresh token then generate a new set
            refreshTokenRepository.Delete(refreshTokenDto.TokenId);
            _unitOfWork.Save();

            AuthenticatedUserResponse response = _authenticator.Authenticate(user);
            string newRefreshToken = _authenticator.CreateAndSaveRefreshToken(user);
            var cookieOptions = new CookieOptions()
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(10)
            };
            Response.Cookies.Append("refreshToken", newRefreshToken, cookieOptions);
            return Ok(response);
        }
    }
}
