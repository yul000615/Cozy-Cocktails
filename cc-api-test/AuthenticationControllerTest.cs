using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cc_api.Controllers;
using cc_api.DAL;
using cc_api.Models;
using cc_api.Models.Configuration;
using cc_api.Models.Requests;
using cc_api.Services;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using static cc_api.Controllers.AuthenticationController;

namespace cc_api_test
{
    public class AuthenticationControllerTest
    {
        #region Fields
        private readonly AuthenticationController _controller;
        private readonly Mock<UnitOfWork> _uowMock;
        private readonly Mock<IPasswordHasher> _hashMock;
        private readonly Mock<GenericTokenGenerator> _tokenMock;
        private readonly Mock<AccessTokenGenerator> _accessTokenMock;
        private readonly Mock<RefreshTokenGenerator> _refreshTokenMock;
        private readonly Mock<AuthenticationConfiguration> _configMock;
        #endregion

        #region Constructors
        public AuthenticationControllerTest()
        {
            _hashMock = new Mock<IPasswordHasher>();

            //UnitOfWork Mock
            _uowMock = new Mock<UnitOfWork>();
            var repoMock = new Mock<IUserRepository>();
            repoMock.Setup(x => x.GetByEmail(It.IsAny<string>())).Returns(() => Task.FromResult(
                new User()
                {
                    FirstName = "Bob",
                    LastName = "Smith",
                    Email = "bobsmith@email.com",
                    //password is "randomhash"
                    Password = "$2a$11$/EAORZ8hF6YJlU7ZxcqDtOQfg2nolwk5YMGxpuwjRnQHLaHCBAOjS"
                }));
            _uowMock.SetupGet(x => x.UserRepository).Returns(repoMock.Object);

            //TokenGenerator Mocks
            _tokenMock = new Mock<GenericTokenGenerator>();
            _configMock = new Mock<AuthenticationConfiguration>();
            _accessTokenMock = new Mock<AccessTokenGenerator>(_configMock.Object, _tokenMock.Object);
            _refreshTokenMock = new Mock<RefreshTokenGenerator>(_configMock.Object, _tokenMock.Object);


            _controller = new AuthenticationController(_uowMock.Object, _hashMock.Object, _accessTokenMock.Object, _refreshTokenMock.Object);
        }
        #endregion

        #region Tests
        [Fact]
        public async Task Login_Valid()
        {
            // Arrange
            _hashMock.Setup(x => x.VerifyPassword(It.IsAny<string>(), It.IsAny<string>())).Returns(true);
            _accessTokenMock.Setup(x => x.GenerateToken(It.IsAny<User>())).Returns("accessToken");
            _refreshTokenMock.Setup(x => x.GenerateToken(It.IsAny<User>())).Returns("refreshToken");
            LoginRequest credentials = new LoginRequest() { Email = "bobsmith@email.com", Password = "randomhash" };

            // Act
            var response = await _controller.Login(credentials);

            //Assert
            var result = response as OkObjectResult;
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(200);
        }

        [Fact]
        public async Task Login_InvalidEmail()
        {
            // Arrange
            _hashMock.Setup(x => x.VerifyPassword(It.IsAny<string>(), It.IsAny<string>())).Returns(false);
            LoginRequest credentials = new LoginRequest() { Email = "test@gmail.com", Password = "testpassword" };

            // Act
            var response = await _controller.Login(credentials);

            //Assert
            var result = response as UnauthorizedResult;
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(401);
        }

        [Fact]
        public async Task Login_InvalidPassword()
        {
            // Arrange
            _hashMock.Setup(x => x.VerifyPassword(It.IsAny<string>(), It.IsAny<string>())).Returns(false);
            LoginRequest credentials = new LoginRequest() { Email = "bobsmith@email.com", Password = "testpassword" };

            // Act
            var response = await _controller.Login(credentials);

            //Assert
            var result = response as UnauthorizedResult;
            result.Should().NotBeNull();
            result.StatusCode.Should().Be(401);
        }
        #endregion
    }
}
