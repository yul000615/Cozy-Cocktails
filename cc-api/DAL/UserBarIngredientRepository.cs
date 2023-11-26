using cc_api.Models;
using Microsoft.EntityFrameworkCore;

namespace cc_api.DAL
{
    public class UserBarIngredientRepository : GenericRepository<UserBarIngredient>, IUserBarIngredientRepository
    {
        public UserBarIngredientRepository(CozyCocktailsContext context) : base(context)
        {
        }

        public async Task<IEnumerable<UserBarIngredient>> GetByIngredientName(string ingredientName)
        {
            return await context.UserBarIngredients.Where(x => x.IngredientName == ingredientName).ToListAsync();
        }

        public async Task<IEnumerable<UserBarIngredient>> GetByUserID(long userID)
        {
            return await context.UserBarIngredients.Where(x => x.UserId == userID).ToListAsync();
        }

        public async Task<UserBarIngredient> GetByContent(long userID, string ingredientName)
        {
            return await context.UserBarIngredients.Where(x => x.UserId == userID && x.IngredientName == ingredientName).FirstOrDefaultAsync();
        }
    }
}
