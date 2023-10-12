using cc_api.DAL;
using cc_api.Models.Configuration;
using cc_api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Text;
using cc_api.Services.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddScoped<UnitOfWork>();
builder.Services.AddScoped<Authenticator>();
builder.Services.AddSingleton<IPasswordHasher, BCryptPasswordHasher>();
builder.Services.AddSingleton<GenericTokenGenerator>();
builder.Services.AddSingleton<AccessTokenGenerator>();
builder.Services.AddSingleton<RefreshTokenGenerator>();
builder.Services.AddSingleton<RefreshTokenValidator>();

AuthenticationConfiguration authConfig = new AuthenticationConfiguration();
builder.Configuration.Bind("Authentication", authConfig);
builder.Services.AddSingleton(authConfig);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters()
    {
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authConfig.AccessTokenSecret)),
        ValidIssuer = authConfig.Issuer,
        ValidAudience = authConfig.Audience,
        ValidateIssuerSigningKey = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        ClockSkew = TimeSpan.Zero
    };
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<CozyCocktailsContext>(options =>
                options.UseSqlite(connectionString));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
