using System;
using System.Collections.Generic;

namespace cc_api.Models;

public partial class Review
{
    public long ReviewId { get; set; }

    public double Rating { get; set; }

    public string Feedback { get; set; } = null!;

    public string DateTime { get; set; } = null!;

    public long RecipeId { get; set; }

    public long UserId { get; set; }

    public virtual Recipe Recipe { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
