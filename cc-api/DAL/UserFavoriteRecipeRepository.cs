using cc_api.Models;

namespace cc_api.DAL
{
    public class UserFavoriteRecipeRepository : GenericRepository<UserFavoriteRecipe>
    {
        public UserFavoriteRecipeRepository(CozyCocktailsContext context) : base(context)
        {
        }
    }
}
