using Microsoft.EntityFrameworkCore;
using PartiCol.Models;

namespace PartiCol.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Partido> Partidos { get; set; }
        public DbSet<Politico> Politicos { get; set; }
    }
}