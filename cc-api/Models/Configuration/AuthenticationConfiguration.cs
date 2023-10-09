namespace cc_api.Models.Configuration
{
    public class AuthenticationConfiguration
    {
        public string? Issuer { get; set; }
        public string? Audience {  get; set; }
        public string? AccessTokenSecret {  get; set; }
        public int AccessTokenExpirationMinutes { get; set; }
    }
}
