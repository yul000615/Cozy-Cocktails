using System;
using System.Collections.Generic;

namespace cc_api.Models;

public partial class RefreshToken
{
    public long TokenId { get; set; }

    public long UserId { get; set; }

    public string Token { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
