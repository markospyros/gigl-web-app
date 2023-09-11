using System.ComponentModel.DataAnnotations;

namespace Gigl_API.Models
{
    public class Comedian
    {
        [Key]
        public string Id { get; set; }

        public string Username { get; set; }

        public string ProfileImage { get; set; }

        public virtual List<Joke> Jokes { get; set; } = new List<Joke>();

        public virtual List<ComedianJoke> LikedJokes { get; set; } = new List<ComedianJoke>(); 

        public DateTime DateJoined { get; set; }

        public Comedian()
        {
            Id = Guid.NewGuid().ToString();
            ProfileImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            DateJoined = DateTime.Now;
        }
    }
}
