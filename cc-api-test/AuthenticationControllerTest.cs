using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cc_api.Controllers;
using cc_api.Models;
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
        private readonly Mock<CozyCocktailsContext> _contextMock;
        #endregion

        #region Constructors
        public AuthenticationControllerTest()
        {
            _contextMock = new Mock<CozyCocktailsContext>() { CallBase = true};
            _controller = new AuthenticationController(_contextMock.Object);
        }
        #endregion

        #region Tests
        [Fact]
        public void Test()
        {
            LoginRequest credentials = new LoginRequest() { Email = "test@gmail.com", Password = "testpassword" };
            var result = _controller.Login(credentials);

            result.Should().BeNull();
        }
        #endregion
    }
}
