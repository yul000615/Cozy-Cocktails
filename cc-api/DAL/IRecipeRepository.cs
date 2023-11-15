using cc_api.Models;
using System.Linq.Expressions;

namespace cc_api.DAL
{
    public interface IRecipeRepository : IGenericRepository<Recipe>
    {
        Task<IEnumerable<Recipe>> GetByName(string name);
    }
}
