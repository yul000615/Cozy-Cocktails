using System;
using System.Collections.Generic;

namespace cc_api.Models;

public partial class Report
{
    public long ReportId { get; set; }

    public string Issue { get; set; } = null!;

    public long RecipeId { get; set; }

    public virtual Recipe Recipe { get; set; } = null!;
}
