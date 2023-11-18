using System;
using System.Collections.Generic;

namespace cc_api.Models;

public partial class Recipe
{
    public long RecipeId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public double ABV { get; set; }

    public double AverageRating { get; set; }

    public long UserAuthor { get; set; }

    public virtual ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();

    public virtual ICollection<Report> Reports { get; set; } = new List<Report>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual User UserAuthorNavigation { get; set; } = null!;

    public virtual ICollection<UserFavoriteRecipe> UserFavoriteRecipes { get; set; } = new List<UserFavoriteRecipe>();
}
