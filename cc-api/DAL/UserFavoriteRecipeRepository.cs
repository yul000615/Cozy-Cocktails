using cc_api.Models;

namespace cc_api.DAL
{
    public class UserFavoriteRecipeRepository : GenericRepository<UserFavoriteRecipe>, IUserFavoriteRecipeRepository
    {
        public UserFavoriteRecipeRepository(CozyCocktailsContext context) : base(context)
        {
        }
    }
}
