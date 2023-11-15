using cc_api.Models;
using Microsoft.EntityFrameworkCore;

namespace cc_api.DAL
{
    public class UserBarIngredientRepository : GenericRepository<UserBarIngredient>, IUserBarIngredientRepository
    {
        public UserBarIngredientRepository(CozyCocktailsContext context) : base(context)
        {
        }

        public async Task<IEnumerable<UserBarIngredient>> GetByUserID(long userID)
        {
            return await context.UserBarIngredients.Where(x => x.UserId == userID).ToListAsync();
        }
    }
}
