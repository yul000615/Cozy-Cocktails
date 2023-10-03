using cc_api.Models;

namespace cc_api.DAL
{
    public class ReviewRepository : GenericRepository<Review>, IReviewRepository
    {
        public ReviewRepository(CozyCocktailsContext context) : base(context)
        {
        }
    }
}
