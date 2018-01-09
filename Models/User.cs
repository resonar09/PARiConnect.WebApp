using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PARiConnect.WebApp.Models
{
    public class User
    {
        public string ContactId { get; set; }
        public string OrgUserMappingKey { get; set; }
        public string FullName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }

    }
}
