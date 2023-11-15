using System;
using System.Collections.Generic;

namespace cc_api.Models;

public partial class User
{
    public long UserId { get; set; }

    public long Admin { get; set; }

    public string FirstName { get; set; } = null!;

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public virtual ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();

    public virtual ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual ICollection<UserBarIngredient> UserBarIngredients { get; set; } = new List<UserBarIngredient>();

    public virtual ICollection<UserFavoriteRecipe> UserFavoriteRecipes { get; set; } = new List<UserFavoriteRecipe>();
}
