using cc_api.DAL;
using cc_api.Models;
using cc_api.Models.Requests;
using cc_api.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace cc_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            try
            {
                System.Diagnostics.Debug.WriteLine("Trying to register");
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid data");
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
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine("Error Occurred during registration");
                System.Diagnostics.Debug.WriteLine(ex);
                return StatusCode(500, "An error occurred during registration.");
            }
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] UpdateUserRequest model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid data");
                }

                if (model == null || string.IsNullOrEmpty(model.Email))
                {
                    return BadRequest("Invalid user data");
                }

                var userRepository = _unitOfWork.UserRepository;
                var user = await userRepository.GetByEmail(model.Email);

                if (user == null)
                {
                    return NotFound("User not found");
                }

                if (!string.IsNullOrEmpty(model.NewEmail))
                {
                    user.Email = model.NewEmail;
                }

                if (!string.IsNullOrEmpty(model.NewPassword))
                {
                    user.Password = _passwordHasher.HashPassword(model.NewPassword);
                }
                _unitOfWork.Save();
                return Ok("User information updated successfully");
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine("Error Occurred during user update");
                System.Diagnostics.Debug.WriteLine(ex);
                return StatusCode(500, "An error occurred during user update.");
            }
        }
    }
}
