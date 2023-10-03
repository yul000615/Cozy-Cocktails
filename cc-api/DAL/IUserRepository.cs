using cc_api.Models;

namespace cc_api.DAL
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User> GetByEmail(string email);
    }
}
