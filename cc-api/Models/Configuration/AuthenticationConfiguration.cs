namespace cc_api.Models.Configuration
{
    public class AuthenticationConfiguration
    {
        public string? Issuer { get; set; }
        public string? Audience {  get; set; }
        public string? AccessTokenSecret {  get; set; }
        public double AccessTokenExpirationMinutes { get; set; }
        public string? RefreshTokenSecret { get; set; }
        public double RefreshTokenExpirationMinutes { get; set; }
    }
}
