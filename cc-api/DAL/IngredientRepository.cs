using cc_api.Models;

namespace cc_api.DAL
{
    public class IngredientRepository : GenericRepository<Ingredient>, IIngredientRepository
    {
        public IngredientRepository(CozyCocktailsContext context) : base(context)
        {
        }
    }
}
