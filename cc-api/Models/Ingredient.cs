using System;
using System.Collections.Generic;

namespace cc_api.Models;

public partial class Ingredient
{
    public string Name { get; set; } = null!;

    public double AlcoholByVolume { get; set; }

    //public virtual ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();

    //public virtual ICollection<UserBarIngredient> UserBarIngredients { get; set; } = new List<UserBarIngredient>();
}
