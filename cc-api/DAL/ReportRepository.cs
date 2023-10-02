using cc_api.Models;

namespace cc_api.DAL
{
    public class ReportRepository : GenericRepository<Report>
    {
        public ReportRepository(CozyCocktailsContext context) : base(context)
        {
        }
    }
}
