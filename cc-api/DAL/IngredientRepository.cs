using cc_api.Models;

namespace cc_api.DAL
{
    public class IngredientRepository : GenericRepository<Ingredient>
    {
        public IngredientRepository(CozyCocktailsContext context) : base(context)
        {
        }
    }
}
