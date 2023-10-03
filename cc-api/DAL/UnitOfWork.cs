using System;
using cc_api.Models;

namespace cc_api.DAL
{
    public class UnitOfWork : IDisposable
    {
        private CozyCocktailsContext context = new CozyCocktailsContext();
        private IIngredientRepository? ingredientRepository;
        private IRecipeRepository? recipeRepository;
        private IRecipeIngredientRepository? recipeIngredientRepository;
        private IReportRepository? reportRepository;
        private IReviewRepository? reviewRepository;
        private IUserRepository? userRepository;
        private IUserBarIngredientRepository? userBarIngredientRepository;
        private IUserFavoriteRecipeRepository? userFavoriteRecipeRepository;

        public virtual IIngredientRepository IngredientRepository
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

        public virtual IRecipeRepository RecipeRepository
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

        public virtual IRecipeIngredientRepository RecipeIngredientRepository
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

        public virtual IReportRepository ReportRepository
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

        public virtual IReviewRepository ReviewRepository
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

        public virtual IUserBarIngredientRepository UserBarIngredientRepository
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

        public virtual IUserFavoriteRecipeRepository UserFavoriteRecipeRepository
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
