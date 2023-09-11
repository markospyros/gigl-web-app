using Gigl_API.DAL;
using Gigl_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Gigl_API.Controllers
{
    [Route("[action]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        public async Task<ActionResult> CreateComedian([FromBody] ComedianDto comedianRequest)
        {
            try
            {
                var tokenString = await _accountService.CreateComedian(comedianRequest);
                return Ok(tokenString);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult> ShowProfile(string token)
        {
            var profile = await _accountService.ShowProfile(token);
            if (profile == null)
                return NotFound();

            return Ok(profile);
        }

        [HttpGet]
        public ActionResult IdentifySignedInUser(string token)
        {
            var username = _accountService.DecodeToken(token);

            return Ok(username);
        }
    }
}
