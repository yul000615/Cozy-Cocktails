using cc_api.Models;
using Microsoft.EntityFrameworkCore;

namespace cc_api.DAL
{
    public class ReviewRepository : GenericRepository<Review>, IReviewRepository
    {
        public ReviewRepository(CozyCocktailsContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Review>> GetByRecipeID(long recipeID)
        {
            return await context.Reviews.Where(x => x.RecipeId == recipeID).ToListAsync();
        }
    }
}
