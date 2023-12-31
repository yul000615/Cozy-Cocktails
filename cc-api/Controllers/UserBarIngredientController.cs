﻿using cc_api.DAL;
using cc_api.Models;
using cc_api.Models.Requests;
using cc_api.Services.Tokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace cc_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserBarIngredientController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly TokenReader _tokenReader;

        public UserBarIngredientController(UnitOfWork unitOfWork, TokenReader tokenReader)
        {
            _unitOfWork = unitOfWork;
            _tokenReader = tokenReader;
        }

        [HttpGet]
        public IActionResult GetUserBarIngredients()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(_unitOfWork.UserBarIngredientRepository.GetAll());
        }


        [HttpGet("getUserBarIngredients")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetUserBarIngredients([FromHeader] string authorization)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            bool tokenExtracted = _tokenReader.GetTokenFromHeader(authorization, out var token);
            if (!tokenExtracted)
            {
                return Unauthorized();
            }

            var tokenUserInfo = _tokenReader.ReadToken(token);

            IEnumerable<UserBarIngredient> UBIs = await _unitOfWork.UserBarIngredientRepository.GetByUserID(tokenUserInfo.Id);

            return UBIs == null ? NoContent() : Ok(UBIs);
        }

        [HttpPost("getUserBarIngredientsUpdated")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> getUserBarIngredientsAdded([FromBody] BarIngredientRequest request, [FromHeader] string authorization)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            bool tokenExtracted = _tokenReader.GetTokenFromHeader(authorization, out var token);
            if (!tokenExtracted)
            {
                return Unauthorized();
            }

            var tokenUserInfo = _tokenReader.ReadToken(token);

            UserBarIngredient UBI = await _unitOfWork.UserBarIngredientRepository.GetByContent(tokenUserInfo.Id, request.ingredientName);

            return UBI == null ? NoContent() : Ok(UBI);
        }

        [HttpPost("addUserBarIngredient")]
        [Authorize(Roles = "User")]
        public IActionResult AddBarIngredient([FromBody] BarIngredientRequest request, [FromHeader] string authorization)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            bool tokenExtracted = _tokenReader.GetTokenFromHeader(authorization, out var token);
            if (!tokenExtracted)
            {
                return Unauthorized();
            }

            var tokenUserInfo = _tokenReader.ReadToken(token);

            UserBarIngredient UBI = new UserBarIngredient()
            {
                UserId = tokenUserInfo.Id,
                IngredientName = request.ingredientName
            };

            _unitOfWork.UserBarIngredientRepository.Insert(UBI);
            _unitOfWork.Save();

            return Ok("Ingredient added to your bar.");
        }

        [HttpDelete("deleteUserBarIngredient")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> DeleteUserBarIngredient([FromBody] BarIngredientRequest request, [FromHeader] string authorization)
        {
            try
            {
                bool tokenExtracted = _tokenReader.GetTokenFromHeader(authorization, out var token);
                if (!tokenExtracted)
                {
                    return Unauthorized();
                }

                var tokenUserInfo = _tokenReader.ReadToken(token);
                UserBarIngredient UBI = await _unitOfWork.UserBarIngredientRepository.GetByContent(tokenUserInfo.Id, request.ingredientName);

                if (UBI == null)
                {
                    return NotFound("Ingredient not found for the user");
                }

                _unitOfWork.UserBarIngredientRepository.Delete(UBI);
                _unitOfWork.Save();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing the request");
            }
        }
    }
}
