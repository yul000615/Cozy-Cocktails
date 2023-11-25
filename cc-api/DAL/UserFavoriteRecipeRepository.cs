using cc_api.Models;
using Microsoft.EntityFrameworkCore;

namespace cc_api.DAL
{
    public class UserFavoriteRecipeRepository : GenericRepository<UserFavoriteRecipe>, IUserFavoriteRecipeRepository
    {
        public UserFavoriteRecipeRepository(CozyCocktailsContext context) : base(context)
        {
        }

        public async Task<IEnumerable<UserFavoriteRecipe>> GetByRecipeID(long recipeID)
        {
            return await context.UserFavoriteRecipes.Where(x => x.RecipeId == recipeID).ToListAsync();
        }

        public async Task<IEnumerable<UserFavoriteRecipe>> GetByUserID(long userID)
        {
            return await context.UserFavoriteRecipes.Where(x => x.UserId == userID).ToListAsync();
        }

        public async Task<UserFavoriteRecipe> GetByContent(long userID, long recipeID)
        {
            return await context.UserFavoriteRecipes.Where(x => x.UserId == userID && x.RecipeId == recipeID).FirstOrDefaultAsync();
        }
    }
}
