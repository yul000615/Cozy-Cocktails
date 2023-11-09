using cc_api.Models;

namespace cc_api.DAL
{
    public interface IReviewRepository : IGenericRepository<Review>
    {
        Task<IEnumerable<Review>> GetByRecipeID(long recipeID);
        Task<IEnumerable<Review>> GetByUserID(long userID);
        Task<Review> GetByContent(long userID, long recipeID);
    }
}
