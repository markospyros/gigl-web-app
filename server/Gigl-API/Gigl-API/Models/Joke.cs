using System.ComponentModel.DataAnnotations;

namespace Gigl_API.Models
{
    public class Joke
    {
        public string Id { get; set; }

        public string ComedianId { get; set; }

        public virtual Comedian Comedian { get; set; } // Navigation property

        public string? ComedianUsername { get; set; }

        public DateTime Date { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public int Gigls { get; set; }

        public virtual List<ComedianJoke> ComediansThatGigled { get; set; } = new List<ComedianJoke>();

        public string Category { get; set; }

        public Joke()
        {
            Id = Guid.NewGuid().ToString();
            Date = DateTime.Now;
            Content = string.Empty;
            Category = "All jokes";
        }
    }
}
