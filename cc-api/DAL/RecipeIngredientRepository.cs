using cc_api.Models;

namespace cc_api.DAL
{
    public class RecipeIngredientRepository : GenericRepository<RecipeIngredient>, IRecipeIngredientRepository
    {
        public RecipeIngredientRepository(CozyCocktailsContext context) : base(context)
        {
        }
    }
}
