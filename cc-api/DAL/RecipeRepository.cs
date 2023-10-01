using cc_api.Models;

namespace cc_api.DAL
{
    public class RecipeRepository : GenericRepository<Recipe>
    {
        public RecipeRepository(CozyCocktailsContext context) : base(context)
        {
        }
    }
}
