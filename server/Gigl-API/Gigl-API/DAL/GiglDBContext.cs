using Gigl_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Gigl_API.DAL
{
    public class GiglDBContext : DbContext
    {
        public GiglDBContext(DbContextOptions<GiglDBContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Comedian> Comedians { get; set; }

        public DbSet<Joke> Jokes { get; set; }

        public DbSet<ComedianJoke> ComedianJokes { get; set; }

        // Override the OnModelCreating method to set up entity configurations
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define composite primary key for ComedianJoke
            modelBuilder.Entity<ComedianJoke>()
                .HasKey(cj => new { cj.ComedianId, cj.JokeId });

            // If you have other entity configurations, you can add them below this line
        }
    }
}
