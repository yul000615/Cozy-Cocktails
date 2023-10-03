using cc_api.Models;
using Microsoft.EntityFrameworkCore;

namespace cc_api.DAL
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(CozyCocktailsContext context) : base(context)
        {
        }

        public async Task<User> GetByEmail(string email)
        {
            return await context.Users.FirstOrDefaultAsync(x => x.Email == email);
        }
    }
}
