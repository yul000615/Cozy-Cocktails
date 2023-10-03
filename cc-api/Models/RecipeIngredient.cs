using System;
using System.Collections.Generic;

namespace cc_api.Models;

public partial class RecipeIngredient
{
    public long ListId { get; set; }

    public double Quantity { get; set; }

    public string QuantityDescription { get; set; } = null!;

    public long RecipeId { get; set; }

    public string IngredientName { get; set; } = null!;

    public virtual Ingredient IngredientNameNavigation { get; set; } = null!;

    public virtual Recipe Recipe { get; set; } = null!;
}
