using cc_api.Models.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace cc_api.Services.Tokens
{
    public class RefreshTokenValidator
    {
        private readonly AuthenticationConfiguration _config;
        public RefreshTokenValidator(AuthenticationConfiguration config)
        {
            _config = config;
        }
        public bool Validate(string refreshToken)
        {
            TokenValidationParameters validationParameters = new TokenValidationParameters()
            {
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.RefreshTokenSecret)),
                ValidIssuer = _config.Issuer,
                ValidAudience = _config.Audience,
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidateAudience = true,
                ClockSkew = TimeSpan.Zero
            };
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(refreshToken, validationParameters, out SecurityToken validatedToken);
                return true;
            } catch (Exception)
            {
                return false;
            }
        }

    }
}
