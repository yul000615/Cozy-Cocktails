using System;
using System.Collections.Generic;

namespace cc_api.Models;

public partial class UserFavoriteRecipe
{
    public long ListId { get; set; }

    public long UserId { get; set; }

    public long RecipeId { get; set; }

    public virtual Recipe Recipe { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
