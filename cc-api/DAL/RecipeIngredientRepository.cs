using cc_api.Models;
using Microsoft.EntityFrameworkCore;

namespace cc_api.DAL
{
    public class RecipeIngredientRepository : GenericRepository<RecipeIngredient>, IRecipeIngredientRepository
    {
        public RecipeIngredientRepository(CozyCocktailsContext context) : base(context)
        {
        }

        public async Task<IEnumerable<RecipeIngredient>> GetByRecipeID(long recipeID)
        {
            return await context.RecipeIngredients.Where(x => x.RecipeId == recipeID).ToListAsync();
        }
    }
}
