using cc_api.Models;

namespace cc_api.DAL
{
    public interface IUserFavoriteRecipeRepository : IGenericRepository<UserFavoriteRecipe>
    {
        Task<IEnumerable<UserFavoriteRecipe>> GetByRecipeID(long recipeID);
    }
}
