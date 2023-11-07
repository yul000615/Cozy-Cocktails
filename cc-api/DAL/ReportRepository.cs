using cc_api.Models;
using Microsoft.EntityFrameworkCore;

namespace cc_api.DAL
{
    public class ReportRepository : GenericRepository<Report>, IReportRepository
    {
        public ReportRepository(CozyCocktailsContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Report>> GetByRecipeID(long recipeID)
        {
            return await context.Reports.Where(x => x.RecipeId == recipeID).ToListAsync();
        }
    }
}
