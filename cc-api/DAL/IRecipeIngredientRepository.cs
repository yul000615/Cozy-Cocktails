using cc_api.Models;

namespace cc_api.DAL
{
    public interface IRecipeIngredientRepository : IGenericRepository<RecipeIngredient>
    {
        Task<IEnumerable<RecipeIngredient>> GetByRecipeID(long recipeID);
    }
}
