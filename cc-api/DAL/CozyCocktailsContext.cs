using cc_api.Models;
using Microsoft.EntityFrameworkCore;

namespace cc_api.DAL
{
    public partial class CozyCocktailsContext : DbContext
    {
        public CozyCocktailsContext()
        {
        }

        public CozyCocktailsContext(DbContextOptions<CozyCocktailsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Ingredient> Ingredients { get; set; }

        public virtual DbSet<Recipe> Recipes { get; set; }

        public virtual DbSet<RecipeIngredient> RecipeIngredients { get; set; }

        public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

        public virtual DbSet<Report> Reports { get; set; }

        public virtual DbSet<Review> Reviews { get; set; }

        public virtual DbSet<User> Users { get; set; }

        public virtual DbSet<UserBarIngredient> UserBarIngredients { get; set; }

        public virtual DbSet<UserFavoriteRecipe> UserFavoriteRecipes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
            => optionsBuilder.UseSqlite("Data Source=./Database/cozy_cocktails.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ingredient>(entity =>
            {
                entity.HasKey(e => e.Name);

                entity.ToTable("Ingredient");

                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.AlcoholByVolume).HasColumnName("alcohol_by_volume");
            });

            modelBuilder.Entity<Recipe>(entity =>
            {
                entity.ToTable("Recipe");

                entity.Property(e => e.RecipeId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("recipe_id");
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.UserAuthor).HasColumnName("user_author");

                entity.HasOne(d => d.UserAuthorNavigation).WithMany(p => p.Recipes)
                    .HasForeignKey(d => d.UserAuthor)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<RecipeIngredient>(entity =>
            {
                entity.HasKey(e => e.ListId);

                entity.ToTable("Recipe_Ingredient");

                entity.Property(e => e.ListId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("list_id");
                entity.Property(e => e.IngredientName).HasColumnName("ingredient_name");
                entity.Property(e => e.Quantity).HasColumnName("quantity");
                entity.Property(e => e.QuantityDescription).HasColumnName("quantity_description");
                entity.Property(e => e.RecipeId).HasColumnName("recipe_id");

                entity.HasOne(d => d.IngredientNameNavigation).WithMany(p => p.RecipeIngredients)
                    .HasForeignKey(d => d.IngredientName)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Recipe).WithMany(p => p.RecipeIngredients)
                    .HasForeignKey(d => d.RecipeId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<RefreshToken>(entity =>
            {
                entity.HasKey(e => e.TokenId);

                entity.ToTable("Refresh_Token");

                entity.Property(e => e.TokenId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("token_id");
                entity.Property(e => e.Token).HasColumnName("token");
                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User).WithMany(p => p.RefreshTokens)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Report>(entity =>
            {
                entity.ToTable("Report");

                entity.Property(e => e.ReportId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("report_id");
                entity.Property(e => e.Issue).HasColumnName("issue");
                entity.Property(e => e.RecipeId).HasColumnName("recipe_id");

                entity.HasOne(d => d.Recipe).WithMany(p => p.Reports)
                    .HasForeignKey(d => d.RecipeId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.ToTable("Review");

                entity.Property(e => e.ReviewId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("review_id");
                entity.Property(e => e.DateTime).HasColumnName("date_time");
                entity.Property(e => e.Feedback).HasColumnName("feedback");
                entity.Property(e => e.Rating).HasColumnName("rating");
                entity.Property(e => e.RecipeId).HasColumnName("recipe_id");
                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Recipe).WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.RecipeId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.User).WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.HasIndex(e => e.Email, "IX_User_email").IsUnique();

                entity.Property(e => e.UserId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("user_id");
                entity.Property(e => e.Admin).HasColumnName("admin");
                entity.Property(e => e.Email).HasColumnName("email");
                entity.Property(e => e.FirstName).HasColumnName("first_name");
                entity.Property(e => e.LastName).HasColumnName("last_name");
                entity.Property(e => e.Password).HasColumnName("password");
            });

            modelBuilder.Entity<UserBarIngredient>(entity =>
            {
                entity.HasKey(e => e.ListId);

                entity.ToTable("User_Bar_Ingredient");

                entity.Property(e => e.ListId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("list_id");
                entity.Property(e => e.IngredientName).HasColumnName("ingredient_name");
                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.IngredientNameNavigation).WithMany(p => p.UserBarIngredients)
                    .HasForeignKey(d => d.IngredientName)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.User).WithMany(p => p.UserBarIngredients)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<UserFavoriteRecipe>(entity =>
            {
                entity.HasKey(e => e.ListId);

                entity.ToTable("User_Favorite_Recipe");

                entity.Property(e => e.ListId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("list_id");
                entity.Property(e => e.RecipeId).HasColumnName("recipe_id");
                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Recipe).WithMany(p => p.UserFavoriteRecipes)
                    .HasForeignKey(d => d.RecipeId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.User).WithMany(p => p.UserFavoriteRecipes)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
