using cc_api.Models;

namespace cc_api.DAL
{
    public interface IUserRepository
    {
        Task<User> GetByEmail(string email);
    }
}
