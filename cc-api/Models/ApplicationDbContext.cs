using Microsoft.EntityFrameworkCore;

namespace cc_api.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        // Define DbSet properties here

        protected override void OnModelCreating(ModelBuiler modelBuilder) OnModelCreating
        {
            // Configure entity relationships and other database setting here
        }
    }
}