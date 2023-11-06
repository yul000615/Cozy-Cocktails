using cc_api.Models;

namespace cc_api.DAL
{
    public interface IReportRepository : IGenericRepository<Report>
    {
        Task<IEnumerable<Report>> GetByRecipeID(long recipeID);
    }
}
