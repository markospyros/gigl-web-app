using Gigl_API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Gigl_API.DAL
{
    public class AccountService : IAccountService
    {
        private readonly GiglDBContext _db;

        public AccountService(GiglDBContext db)
        {
            _db = db;
        }

        public async Task<string> CreateComedian(ComedianDto comedianRequest)
        {
            if (string.IsNullOrWhiteSpace(comedianRequest.Username))
                throw new ArgumentException("Username cannot be empty or contain spaces.");

            var existingUsername = _db.Comedians.FirstOrDefault(p => p.Username == comedianRequest.Username);
            if (existingUsername != null)
                throw new InvalidOperationException("Username taken!");

            var newComedian = new Comedian
            {
                Username = comedianRequest.Username,
                ProfileImage = comedianRequest.ProfileImage
            };

            _db.Comedians.Add(newComedian);
            await _db.SaveChangesAsync();

            return GenerateJwtToken("username", newComedian.Username);
        }

        public async Task<ComedianDto> ShowProfile(string token)
        {
            var username = DecodeToken(token);
            var comedian = _db.Comedians.FirstOrDefault(c => c.Username == username);

            if (comedian == null)
                return null;

            return new ComedianDto
            {
                ProfileImage = comedian.ProfileImage,
                Username = username
            };
        }



        public string HashPassword(string password)
        {
            var hasher = new PasswordHasher<object>();
            return hasher.HashPassword(null, password);
        }

        public bool VerifyPassword(string hashedPassword, string passwordToVerify)
        {
            var hasher = new PasswordHasher<object>();
            var result = hasher.VerifyHashedPassword(null, hashedPassword, passwordToVerify);
            return result == PasswordVerificationResult.Success;
        }

        public string GenerateJwtToken(string keyString, string valueString)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("YourSuperSecretKey");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(keyString, valueString) }),
                Expires = DateTime.UtcNow.AddYears(20), // Token expiry, set as desired
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

        // Base64Url decode method
        public static byte[] Base64UrlDecode(string arg)
        {
            string s = arg;
            s = s.Replace('-', '+').Replace('_', '/');
            switch (s.Length % 4)
            {
                case 0:
                    break;
                case 2:
                    s += "==";
                    break;
                case 3:
                    s += "=";
                    break;
                default:
                    throw new Exception("Illegal base64url string!");
            }

            return Convert.FromBase64String(s);
        }

        public string DecodeToken(string token)
        {
            var parts = token.Split('.');
            if (parts.Length != 3)
            {
                throw new InvalidOperationException("JWT does not have 3 parts!");
            }

            string payload = parts[1];
            string jsonPayload = Encoding.UTF8.GetString(Base64UrlDecode(payload));

            var jsonObject = JObject.Parse(jsonPayload);

            // Example: Extract a specific claim
            var username = jsonObject["username"]?.ToString();

            return username;
        }
    }
}
