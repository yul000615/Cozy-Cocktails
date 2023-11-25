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

        public async Task<IEnumerable<Review>> GetByUserID(long userID)
        {
            return await context.Reviews.Where(x => x.UserId == userID).ToListAsync();
        }

        public async Task<Review> GetByContent(long userID, long recipeID)
        {
            return await context.Reviews.Where(x => x.UserId == userID && x.RecipeId == recipeID).FirstOrDefaultAsync();
        }
    }
}
