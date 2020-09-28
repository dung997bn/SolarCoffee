using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SolarCoffee.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolarCoffee.Data
{
    public class SolarDbContext : IdentityDbContext
    {
        public SolarDbContext() { }

        public SolarDbContext(DbContextOptions options) : base(options) { }

        public virtual DbSet<Customer> Customers { get; set; }

        public virtual DbSet<CustomerAddress> CustomerAddresses { get; set; }

        public virtual DbSet<Product> Products { get; set; }

        public virtual DbSet<ProductInventory> ProductInventories { get; set; }

        public virtual DbSet<ProductInventorySnapshot> ProductInventorySnapshots { get; set; }

        public virtual DbSet<SalesOrder> SalesOrders { get; set; }

        public virtual DbSet<SalesOrderItem> SalesOrderItems { get; set; }
    }
}
