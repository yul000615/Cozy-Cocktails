using cc_api.Models;

namespace cc_api.Services
{
    public interface ITokenGenerator
    {
        string GenerateToken(User user);
    }
}
