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

        public async Task DeleteAllByUserId(long id)
        {
            List<RefreshToken> tokens = await context.RefreshTokens.Where(x => x.UserId == id).ToListAsync();
            foreach (RefreshToken token in tokens)
            {
                context.RefreshTokens.Remove(token);
            }
        }
    }
}
