using SolarCoffee.Data;
using SolarCoffee.Data.Models;
using SolarCoffee.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolarCoffee.Services.Implementations
{
    public class ProductService : IProductService
    {
        private readonly SolarDbContext _db;

        public ProductService(SolarDbContext db)
        {
            _db = db;
        }

        public ServiceResponse<Product> ArchiveProduct(int Id)
        {
            try
            {
                var product = _db.Products.Find(Id);
                product.IsArchived = true;
                _db.SaveChanges();
                return new ServiceResponse<Product>
                {
                    Data = product,
                    Time = DateTime.UtcNow,
                    Message = "Saved product",
                    IsSuccess = true
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponse<Product>
                {
                    Data = null,
                    Time = DateTime.UtcNow,
                    Message = "Error archive product: " + ex.Message,
                    IsSuccess = false
                };
            }
        }

        public ServiceResponse<Product> CreateProduct(Product product)
        {
            try
            {
                _db.Products.Add(product);

                var newInventory = new ProductInventory
                {
                    Product = product,
                    QuantityOnHand = 0,
                    IdealQuantity = 10
                };
                _db.ProductInventories.Add(newInventory);
                _db.SaveChanges();
                return new ServiceResponse<Product>
                {
                    Data = product,
                    Time = DateTime.UtcNow,
                    Message = "Saved product",
                    IsSuccess = true
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponse<Product>
                {
                    Data = null,
                    Time = DateTime.UtcNow,
                    Message = "Error saving product: " + ex.Message,
                    IsSuccess = false
                };
            }
        }

        public List<Product> GetAllProducts()
        {
            return _db.Products.ToList();
        }

        public Product GetById(int Id)
        {
            return _db.Products.Find(Id);
        }
    }
}
