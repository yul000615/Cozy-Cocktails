using cc_api.Models;

namespace cc_api.DAL
{
    public class RefreshTokenRepository : GenericRepository<RefreshToken>, IRefreshTokenRepository
    {
        public RefreshTokenRepository(CozyCocktailsContext context) : base(context)
        {
        }
    }
}
