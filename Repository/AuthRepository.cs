using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PARiConnect.WebApp.Helpers;
using PARiConnect.WebApp.Models;

namespace PARiConnect.WebApp.Repository
{
    public class JwtPacket
    {
        public string Token { get; set; }
        public string ContactId { get; set; }
        public string OrgUserMappingKey { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
    }
    public class AuthRepository : IAuthRepository
    {
        private readonly AppSettings _appSettings;
        public AuthRepository(IOptions<AppSettings> appSettings)
        {
             _appSettings = appSettings.Value;
        }
        public async Task<User> Login(string email, string password)
        {
            User user = new User();
            //bypass auth check
            if (email == "test@test.com")
            {
                user.ContactId = "123456";
                user.OrgUserMappingKey = "54338";
                user.FirstName = "Test";
                user.LastName = "Test";
                user.FullName = "Test Test";
                user.Email = email;
                return user;

            }
            OrgUserServiceDevReference.OrgUserServiceClient orgUserServiceClient = new OrgUserServiceDevReference.OrgUserServiceClient();
            OrgUserServiceDevReference.AuthenticationToken authenticationToken = new OrgUserServiceDevReference.AuthenticationToken();
            authenticationToken.EmailAddress = email;
            authenticationToken.Password = password;

            OrgUserServiceDevReference.AuthenticateCorpSvcsRequest authenticateCorpSvcsRequest = new OrgUserServiceDevReference.AuthenticateCorpSvcsRequest();
            authenticateCorpSvcsRequest.token = authenticationToken;
            var userAuth = await orgUserServiceClient.AuthenticateCorpSvcsAsync(authenticateCorpSvcsRequest);
            if (userAuth.AuthenticateCorpSvcsResult.IsValid)
            {
                user.ContactId = userAuth.identities[0].UserData.ContactID;
                user.FullName = userAuth.identities[0].UserData.FullName;
                user.OrgUserMappingKey = userAuth.identities[0].OrgUserMapping.OrgUserMappingKey.ToString();
                user.Email = email;
                return user;
            }
            return null;

        }

        public Task<bool> UserExists(string email)
        {
            throw new System.NotImplementedException();
        }

    }

}
/*                  var token = new JwtSecurityToken(
                    issuer: "localhost:50840",
                    audience: "localhost:50840",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds); */