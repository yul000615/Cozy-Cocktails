using cc_api.Models;
using cc_api.Models.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace cc_api.Services
{
    public class AccessTokenGenerator : ITokenGenerator
    {
        private readonly AuthenticationConfiguration _config;

        public AccessTokenGenerator(AuthenticationConfiguration config)
        {
            _config = config;
        }
        public string GenerateToken(User user)
        {
            SecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.AccessTokenSecret));
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            List<Claim> claims = new List<Claim>()
            {
                new Claim("id", user.UserId.ToString()),
                new Claim(ClaimTypes.Role, user.Admin == 0 ? "User" : "Admin"),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
            };

            JwtSecurityToken token = new JwtSecurityToken(
                _config.Issuer,
                _config.Audience, 
                claims, 
                DateTime.UtcNow,
                DateTime.UtcNow.AddMinutes(_config.AccessTokenExpirationMinutes),
                credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
