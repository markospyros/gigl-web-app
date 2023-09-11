namespace Gigl_API.Models
{
    public class ComedianJoke
    {
        public string ComedianId { get; set; }
        public virtual Comedian Comedian { get; set; }

        public string JokeId { get; set; }
        public virtual Joke Joke { get; set; }
    }
}
