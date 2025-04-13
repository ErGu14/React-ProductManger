using Microsoft.EntityFrameworkCore;
using SampleAPI.DTOs;
using SampleAPI.Models;

namespace SampleAPI.ApplicationDbContexts
{
    public sealed class AppDbContext :DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}
