using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;

using DeviceRegistry.Models;

namespace DeviceRegistry.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Thing> Things { get; set; }
        public DataContext(DbContextOptions<DataContext> options)
        : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}