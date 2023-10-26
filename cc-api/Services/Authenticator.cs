using cc_api.DAL;
using cc_api.Models.Responses;
using cc_api.Models;
using cc_api.Services.Tokens;

namespace cc_api.Services
{
    public class Authenticator
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly AccessTokenGenerator _accessTokenGenerator;
        private readonly RefreshTokenGenerator _refreshTokenGenerator;
        public Authenticator(UnitOfWork unitOfWork, AccessTokenGenerator accessTokenGenerator, RefreshTokenGenerator refreshTokenGenerator)
        {
            _unitOfWork = unitOfWork;
            _accessTokenGenerator = accessTokenGenerator;
            _refreshTokenGenerator = refreshTokenGenerator;
        }

        public virtual AuthenticatedUserResponse Authenticate(User user)
        {
            string accessToken = _accessTokenGenerator.GenerateToken(user);

            return new AuthenticatedUserResponse()
            {
                AccessToken = accessToken
            };
        }

        public virtual string CreateAndSaveRefreshToken(User user)
        {
            string refreshToken = _refreshTokenGenerator.GenerateToken(user);
            RefreshToken refreshTokenDto = new RefreshToken()
            {
                Token = refreshToken,
                UserId = user.UserId
            };
            var tokenRepository = _unitOfWork.RefreshTokenRepository;
            tokenRepository.Insert(refreshTokenDto);
            _unitOfWork.Save();

            return refreshToken;
        }
    }
}
