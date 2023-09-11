using Gigl_API.Models;
using Gigl_API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Gigl_API.Controllers
{
    [Route("[action]")]
    public class JokeController : ControllerBase
    {
        private readonly IJokeService _jokeService;

        public JokeController(IJokeService jokeService)
        {
            _jokeService = jokeService;
        }

        [HttpGet]
        public ActionResult<string[]> ListJokeTypes()
        {
            return Ok(_jokeService.ListJokeTypes());
        }

        [HttpPost]
        public async Task<IActionResult> MakeAJoke([FromBody] JokeRequest joke, string token)
        {
            var result = await _jokeService.MakeAJoke(joke, token);

            if (result == "User isn't signed in.")
            {
                return BadRequest(result);
            }
            else if (result == "Title, content, or category cannot be empty.")
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult> ListJokesBasedByCategory(string category)
        {
            var jokes = await _jokeService.ListJokesBasedByCategory(category);
            if (jokes == null)
            {
                return BadRequest("Internal server error");
            }
            return Ok(jokes);
        }

        [HttpPost]
        public async Task<IActionResult> LikeAJoke([FromBody] GiglDto gigl, string token)
        {
            bool result = await _jokeService.LikeAJoke(gigl, token);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> IsAJokeGigledByUser([FromBody] GiglDto gigl, string token)
        {
            bool result = await _jokeService.IsAJokeGigledByUser(gigl, token);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> ListGigledJokes(string token)
        {
            var jokes = await _jokeService.ListGigledJokes(token);

            if (jokes == null || !jokes.Any())
            {
                return NotFound("No gigled jokes found!");
            }

            return Ok(jokes);
        }

        [HttpGet]
        public async Task<IActionResult> ShowUsersJokes(string token)
        {
            var jokes = await _jokeService.ShowUsersJokes(token);
            return Ok(jokes);
        }
    }
}
