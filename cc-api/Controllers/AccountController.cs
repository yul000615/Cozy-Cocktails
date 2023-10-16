using cc_api.DAL;
using cc_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace cc_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public AccountController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistrationRequest model)
        {
            Console.WriteLine("Received data from the frontend:");
            Console.WriteLine($"First Name: {model.FirstName}");
            Console.WriteLine($"Last Name: {model.LastName}");
            Console.WriteLine($"Email: {model.Email}");
            Console.WriteLine($"Password: {model.Password}");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (await _unitOfWork.Users.EmailExists(model.Email))
            {
                return BadRequest("Email is already registered.");
            }

            var user = new User()
            {
                Email = model.Email,
                Password = model.Password
            };

            _unitOfWork.Users.Add(user);
            await _unitOfWork.SaveChangesAsync();
            return Ok($"User {model.FirstName} {model.LastName} with email {model.Email} registered successfully");
        }
    }
}
