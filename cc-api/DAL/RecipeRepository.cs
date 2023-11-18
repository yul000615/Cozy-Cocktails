using cc_api.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;

namespace cc_api.DAL
{
    public class RecipeRepository : GenericRepository<Recipe>, IRecipeRepository
    {
        public RecipeRepository(CozyCocktailsContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Recipe>> GetByName(string name)
        {
            return await context.Recipes.Where(x => x.Name.Contains(name)).ToListAsync();
        }
    }
}
