using cc_api.Models;

namespace cc_api.DAL
{
    public class ReportRepository : GenericRepository<Report>, IReportRepository
    {
        public ReportRepository(CozyCocktailsContext context) : base(context)
        {
        }
    }
}
