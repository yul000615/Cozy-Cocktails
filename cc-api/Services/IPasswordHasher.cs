namespace cc_api.Services
{
    public interface IPasswordHasher
    {
        string HashPassword(string password);
        bool VerifyPassword(string passwordToCheck, string passwordHash);
    }
}
