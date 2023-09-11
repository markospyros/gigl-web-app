using Gigl_API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Gigl_API.DAL
{
    public interface IAccountService
    {
        Task<string> CreateComedian(ComedianDto comedianRequest);
        Task<ComedianDto> ShowProfile(string token);
        string GenerateJwtToken(string keyString, string valueString);
        string DecodeToken(string token);
    }
}
