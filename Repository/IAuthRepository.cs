using System.Threading.Tasks;
using PARiConnect.WebApp.Models;

namespace PARiConnect.WebApp.Repository
{
    public interface IAuthRepository
    {
         Task<User> Login (string email, string password);
         Task<bool> UserExists(string email);

         
    }
}