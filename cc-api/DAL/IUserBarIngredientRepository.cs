using cc_api.Models;

namespace cc_api.DAL
{
    public interface IUserBarIngredientRepository : IGenericRepository<UserBarIngredient>
    {
        Task<IEnumerable<UserBarIngredient>> GetByIngredientName(string ingredientName);
        Task<IEnumerable<UserBarIngredient>> GetByUserID(long userID);
        Task<UserBarIngredient> GetByContent(long userID, string ingredientName);
    }
}
