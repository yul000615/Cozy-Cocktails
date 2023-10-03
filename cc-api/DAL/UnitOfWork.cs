namespace cc_api.DAL
{
    public class UnitOfWork : IDisposable
    {
        private CozyCocktailsContext context = new CozyCocktailsContext();
        private IngredientRepository? ingredientRepository;
        private RecipeRepository? recipeRepository;
        private RecipeIngredientRepository? recipeIngredientRepository;
        private ReportRepository? reportRepository;
        private ReviewRepository? reviewRepository;
        private IUserRepository? userRepository;
        private UserBarIngredientRepository? userBarIngredientRepository;
        private UserFavoriteRecipeRepository? userFavoriteRecipeRepository;

        public IngredientRepository IngredientRepository
        {
            get
            {

                if (this.ingredientRepository == null)
                {
                    this.ingredientRepository = new IngredientRepository(context);
                }
                return IngredientRepository;
            }
        }

        public RecipeRepository RecipeRepository
        {
            get
            {

                if (this.recipeRepository == null)
                {
                    this.recipeRepository = new RecipeRepository(context);
                }
                return recipeRepository;
            }
        }

        public RecipeIngredientRepository RecipeIngredientRepository
        {
            get
            {

                if (this.recipeIngredientRepository == null)
                {
                    this.recipeIngredientRepository = new RecipeIngredientRepository(context);
                }
                return recipeIngredientRepository;
            }
        }

        public ReportRepository ReportRepository
        {
            get
            {

                if (this.reportRepository == null)
                {
                    this.reportRepository = new ReportRepository(context);
                }
                return reportRepository;
            }
        }

        public ReviewRepository ReviewRepository
        {
            get
            {

                if (this.reviewRepository == null)
                {
                    this.reviewRepository = new ReviewRepository(context);
                }
                return reviewRepository;
            }
        }

        public virtual IUserRepository UserRepository
        {
            get
            {

                if (this.userRepository == null)
                {
                    this.userRepository = new UserRepository(context);
                }
                return userRepository;
            }
        }

        public UserBarIngredientRepository UserBarIngredientRepository
        {
            get
            {

                if (this.userBarIngredientRepository == null)
                {
                    this.userBarIngredientRepository = new UserBarIngredientRepository(context);
                }
                return userBarIngredientRepository;
            }
        }

        public UserFavoriteRecipeRepository UserFavoriteRecipeRepository
        {
            get
            {

                if (this.userFavoriteRecipeRepository == null)
                {
                    this.userFavoriteRecipeRepository = new UserFavoriteRecipeRepository(context);
                }
                return userFavoriteRecipeRepository;
            }
        }

        public void Save()
        {
            context.SaveChanges();
        }

        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
