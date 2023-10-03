using System;
using System.Collections.Generic;

namespace cc_api.Models;

public partial class UserBarIngredient
{
    public long ListId { get; set; }

    public long UserId { get; set; }

    public string IngredientName { get; set; } = null!;

    public virtual Ingredient IngredientNameNavigation { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
