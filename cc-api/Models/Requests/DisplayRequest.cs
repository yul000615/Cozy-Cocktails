using System.ComponentModel.DataAnnotations;

namespace cc_api.Models.Requests
{
    public class DisplayRequest
    {
        [Required]
        public int ID { get; set; }
    }
}
