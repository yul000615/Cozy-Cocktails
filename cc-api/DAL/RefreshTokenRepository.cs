using cc_api.Models;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace cc_api.DAL
{
    public class RefreshTokenRepository : GenericRepository<RefreshToken>, IRefreshTokenRepository
    {
        public RefreshTokenRepository(CozyCocktailsContext context) : base(context)
        {
        }

        public async Task<RefreshToken> GetByToken(string token)
        {
            RefreshToken refreshToken = await context.RefreshTokens.FirstOrDefaultAsync(x => x.Token == token);
            return refreshToken;
        }
    }
}
