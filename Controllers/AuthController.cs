using System;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using PARiConnect.WebApp.Helpers;
using PARiConnect.WebApp.Dtos;
using PARiConnect.WebApp.Models;
using PARiConnect.WebApp.Repository;

namespace PARiConnect.WebApp.Controllers
{
    public class JwtPacket
    {
        public string Token { get; set; }
        public string ContactId { get; set; }
        public string OrgUserMappingKey { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
    }

    [Authorize]
    [Produces("application/json")]
    [Route("auth")]
    public class AuthController : Controller
    {

        private readonly AppSettings _appSettings;
        private readonly IAuthRepository _repo;

        public AuthController(IAuthRepository repo, IOptions<AppSettings> appSettings)
        {
            _repo = repo;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            //throw new Exception("It blowed up");
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var userFromRepo = await _repo.Login(loginDto.Email, loginDto.Password);
            if (userFromRepo == null)
                return Unauthorized();
            return Ok(CreateJwtPacket(userFromRepo));
        }

        JwtPacket CreateJwtPacket(User user)
        {
            var key = Encoding.UTF8.GetBytes(_appSettings.Secret);
            var signingKey = new SymmetricSecurityKey(key);
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.ContactId)
            };
            var jwt = new JwtSecurityToken(claims: claims,
            signingCredentials: signingCredentials);
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new JwtPacket() { Token = encodedJwt, FullName = user.FullName, ContactId = user.ContactId, OrgUserMappingKey = user.OrgUserMappingKey };
        }

    }

}