namespace cc_api.Services
{
    public class BCryptPasswordHasher
    {
        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public bool VerifyPassword(string passwordToCheck, string passwordHash)
        {
            return BCrypt.Net.BCrypt.Verify(passwordToCheck, passwordHash);
        }
    }
}
