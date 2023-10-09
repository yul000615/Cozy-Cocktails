﻿using cc_api.Models;
using cc_api.Models.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace cc_api.Services
{
    public class AccessTokenGenerator
    {
        private readonly AuthenticationConfiguration _config;
        private readonly GenericTokenGenerator _tokenGenerator;
        public AccessTokenGenerator(AuthenticationConfiguration config, GenericTokenGenerator tokenGenerator)
        {
            _config = config;
            _tokenGenerator = tokenGenerator;
        }
        public virtual string GenerateToken(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim("id", user.UserId.ToString()),
                new Claim(ClaimTypes.Role, user.Admin == 0 ? "User" : "Admin"),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
            };

            return _tokenGenerator.GenerateToken(
                _config.AccessTokenSecret,
                _config.Issuer,
                _config.Audience,
                _config.AccessTokenExpirationMinutes,
                claims
                );
        }
    }
}
