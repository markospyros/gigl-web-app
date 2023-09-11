using Gigl_API.DAL;
using Gigl_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Gigl_API.Services
{
    public class JokeService : IJokeService
    {
        private readonly GiglDBContext _db;
        private readonly IAccountService _accountService;

        public JokeService(GiglDBContext db, IAccountService accountService)
        {
            _db = db;
            _accountService = accountService;
        }

        public string[] ListJokeTypes()
        {
            return new string[]
            {
                "All jokes",
                "Clever jokes",
                "Animal jokes",
                "Political jokes",
                "Joke for kids",
                "Blonde jokes",
                "Adult jokes",
                "Ethnic jokes",
                "Question format jokes",
                "\"What do you call...\" jokes"
            };
        }

        public async Task<string> MakeAJoke(JokeRequest joke, string token)
        {
            var username = _accountService.DecodeToken(token);

            if (string.IsNullOrEmpty(token))
            {
                return "User isn't signed in.";
            }

            if (string.IsNullOrEmpty(joke.Title) || string.IsNullOrEmpty(joke.Content) || string.IsNullOrEmpty(joke.Category))
            {
                return "Title, content, or category cannot be empty.";
            }

            var newJoke = new Joke
            {
                Title = joke.Title,
                Content = joke.Content,
                Category = joke.Category,
                ComedianUsername = username
            };

            var comedian = _db.Comedians.FirstOrDefault(c => c.Username == username);
            comedian.Jokes.Add(newJoke);
            _db.Jokes.Add(newJoke);
            await _db.SaveChangesAsync();

            return "Your joke is registered!";
        }

        public async Task<List<JokeDto>> ListJokesBasedByCategory(string category)
        {
            var jokes = category == "All jokes"
                ? await _db.Jokes.Select(j => new JokeDto
                {
                    Id = j.Id,
                    ComedianId = j.ComedianId,
                    ComedianUsername = j.ComedianUsername,
                    ProfileImage = j.Comedian.ProfileImage,
                    Date = j.Date,
                    Title = j.Title,
                    Content = j.Content,
                    Gigls = j.Gigls,
                    Category = j.Category
                })
                .OrderByDescending(j => j.Date)
                .ToListAsync()

                : await _db.Jokes
                .Where(j => j.Category == category)
                .Select(j => new JokeDto
                {
                    Id = j.Id,
                    ComedianId = j.ComedianId,
                    ComedianUsername = j.ComedianUsername,
                    ProfileImage = j.Comedian.ProfileImage,
                    Date = j.Date,
                    Title = j.Title,
                    Content = j.Content,
                    Gigls = j.Gigls,
                    Category = j.Category
                })
                .OrderByDescending(j => j.Date)
                .ToListAsync();

            return jokes;
        }

        public async Task<bool> LikeAJoke(GiglDto gigl, string token)
        {
            var username = _accountService.DecodeToken(token);
            var existingUsername = _db.Comedians.FirstOrDefault(c => c.Username == username);

            gigl.ComedianId = existingUsername.Id;

            var existingJoke = await _db.Jokes.FirstOrDefaultAsync(e => e.Id == gigl.JokeId);
            var hasGigled = _db.ComedianJokes.Any(cj => cj.ComedianId == gigl.ComedianId && cj.JokeId == gigl.JokeId);
            var existingGigl = _db.ComedianJokes.FirstOrDefault(cj => cj.ComedianId == gigl.ComedianId && cj.JokeId == gigl.JokeId);

            if (hasGigled)
            {
                existingJoke.Gigls -= 1;
                _db.ComedianJokes.Remove(existingGigl);
                await _db.SaveChangesAsync();
                return false;
            }

            var newGigl = new ComedianJoke
            {
                ComedianId = gigl.ComedianId,
                JokeId = gigl.JokeId
            };

            existingJoke.Gigls += 1;
            _db.ComedianJokes.Add(newGigl);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> IsAJokeGigledByUser(GiglDto gigl, string token)
        {
            var username = _accountService.DecodeToken(token);
            var existingUsername = _db.Comedians.FirstOrDefault(c => c.Username == username);

            gigl.ComedianId = existingUsername.Id;

            var hasGigled = _db.ComedianJokes.Any(cj => cj.ComedianId == gigl.ComedianId && cj.JokeId == gigl.JokeId);

            return !hasGigled;
        }

        public async Task<List<JokeDto>> ListGigledJokes(string token)
        {
            var username = _accountService.DecodeToken(token);
            var existingUsername = _db.Comedians.FirstOrDefault(c => c.Username == username);

            return await _db.ComedianJokes.Where(cj => cj.Comedian.Id == existingUsername.Id)
                .Include(j => j.Joke)
                .Select(j => new JokeDto
                {
                    Id = j.Joke.Id,
                    ComedianId = j.ComedianId,
                    ComedianUsername = j.Joke.ComedianUsername,
                    ProfileImage = j.Comedian.ProfileImage,
                    Date = j.Joke.Date,
                    Title = j.Joke.Title,
                    Content = j.Joke.Content,
                    Gigls = j.Joke.Gigls,
                    Category = j.Joke.Category
                })
                .ToListAsync();
        }

        public async Task<List<JokeDto>> ShowUsersJokes(string token)
        {
            var username = _accountService.DecodeToken(token);
            var existingUsername = _db.Comedians.FirstOrDefault(c => c.Username == username);

            return await _db.Jokes.Where(j => j.Comedian.Id == existingUsername.Id)
                .Select(j => new JokeDto
                {
                    Id = j.Id,
                    ComedianId = j.ComedianId,
                    ComedianUsername = j.ComedianUsername,
                    ProfileImage = j.Comedian.ProfileImage,
                    Date = j.Date,
                    Title = j.Title,
                    Content = j.Content,
                    Gigls = j.Gigls,
                    Category = j.Category
                })
                .OrderByDescending(j => j.Date)
                .ToListAsync();
        }
    }
}
