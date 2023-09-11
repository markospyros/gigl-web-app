using Gigl_API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gigl_API.Services
{
    public interface IJokeService
    {
        string[] ListJokeTypes();

        Task<string> MakeAJoke(JokeRequest joke, string token);

        Task<List<JokeDto>> ListJokesBasedByCategory(string category);

        Task<bool> LikeAJoke(GiglDto gigl, string token);

        Task<bool> IsAJokeGigledByUser(GiglDto gigl, string token);

        Task<List<JokeDto>> ListGigledJokes(string token);

        Task<List<JokeDto>> ShowUsersJokes(string token);
    }
}
