using cc_api.Models;

namespace cc_api.DAL
{
    public class RecipeIngredientRepository : GenericRepository<RecipeIngredient>
    {
        public RecipeIngredientRepository(CozyCocktailsContext context) : base(context)
        {
        }
    }
}
