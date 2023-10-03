using cc_api.Models;

namespace cc_api.DAL
{
    public class UserBarIngredientRepository : GenericRepository<UserBarIngredient>, IUserBarIngredientRepository
    {
        public UserBarIngredientRepository(CozyCocktailsContext context) : base(context)
        {
        }
    }
}
