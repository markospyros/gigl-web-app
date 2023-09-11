using Gigl_API.DAL;
using Gigl_API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
    );

builder.Services.AddSignalR();

builder.Services.AddEndpointsApiExplorer();

// Configure SwaggerGen with an explicit endpoint.
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});

builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IJokeService, JokeService>();

builder.Services.AddDbContext<GiglDBContext>(options => options.UseSqlite("Data source=Database.db"));

builder.Services.AddDistributedMemoryCache();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("*")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromDays(365 * 20);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.MaxAge = TimeSpan.FromDays(365 * 20);
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
   .AddJwtBearer(options =>
   {
       options.TokenValidationParameters = new TokenValidationParameters
       {
           ValidateIssuer = true,
           ValidateAudience = true,
           ValidateLifetime = true,
           ValidateIssuerSigningKey = true,
           ValidIssuer = "YourIssuer",
           ValidAudience = "YourAudience",
           IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSuperSecretKey"))
       };
   });

var app = builder.Build();

// Configure the HTTP request pipeline.

// Enable Swagger always, not only in development. (Optional, based on your security preferences)
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
});

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();

app.UseSession();

app.UseAuthorization();

// Serve static files from the wwwroot directory
app.UseStaticFiles();

// Handle client-side routing
app.MapFallbackToFile("index.html");

app.MapControllers();

app.Run();
