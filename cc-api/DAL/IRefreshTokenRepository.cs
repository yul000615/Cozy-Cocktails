using cc_api.Models;

namespace cc_api.DAL
{
    public interface IRefreshTokenRepository : IGenericRepository<RefreshToken>
    {
        Task<RefreshToken> GetByToken(string token);
        Task DeleteAllByUserId(long id);
    }
}
