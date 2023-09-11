using System.ComponentModel.DataAnnotations;

namespace Gigl_API.Models
{
    public class JokeDto
    {
        [Key]
        public string Id { get; set; }

        public string ComedianId { get; set; }

        public string ComedianUsername { get; set; }

        public string ProfileImage { get; set; }

        public DateTime Date { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public int Gigls { get; set; }

        public string Category { get; set; }
    }
}
