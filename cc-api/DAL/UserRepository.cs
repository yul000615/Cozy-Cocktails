using cc_api.Models;

namespace cc_api.DAL
{
    public class UserRepository : GenericRepository<User>
    {
        public UserRepository(CozyCocktailsContext context) : base(context)
        {
        }
    }
}
