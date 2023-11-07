using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Net;
using System.Security.Claims;
using cc_api.Models;

namespace cc_api.Services.Tokens
{
    public class TokenReader
    {

        public bool GetTokenFromHeader(string header, out string token)
        {
            token = "";
            if (AuthenticationHeaderValue.TryParse(header, out var headerValue))
            {
                token = headerValue.Parameter;
                return true;
            }

            return false;
        }

        public TokenUserInfo ReadToken(string encodedToken)
        {
            var handler = new JwtSecurityTokenHandler();
            var decodedToken = handler.ReadToken(encodedToken) as JwtSecurityToken;

            var userId = long.Parse(decodedToken.Claims.First(claim => claim.Type == "id").Value);
            var userName = decodedToken.Claims.First(claim => claim.Type == ClaimTypes.Name).Value;
            var userEmail = decodedToken.Claims.First(claim => claim.Type == ClaimTypes.Email).Value;

            return new TokenUserInfo()
            {
                Id = userId,
                Name = userName,
                Email = userEmail
            };
        }
    }
}
