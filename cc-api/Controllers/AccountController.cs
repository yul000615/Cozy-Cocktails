using cc_api.DAL;
using cc_api.Models;
using cc_api.Models.Requests;
using cc_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace cc_api.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IPasswordHasher _passwordHasher;

        public AccountController(UnitOfWork unitOfWork, IPasswordHasher passwordHasher)
        {
            _unitOfWork = unitOfWork;
            _passwordHasher = passwordHasher;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistrationRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userRepository = _unitOfWork.UserRepository;
            if (await userRepository.EmailExists(model.Email))
            {
                return BadRequest("Email is already registered.");
            }

            var user = new User()
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Password = _passwordHasher.HashPassword(model.Password)
            };

            userRepository.Insert(user);
            _unitOfWork.Save();

            return Ok("User registered successfully");
        }
    }
}
