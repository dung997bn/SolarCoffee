using SolarCoffee.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolarCoffee.Services.Interfaces
{
    public interface IProductService
    {
        List<Product> GetAllProducts();
        Product GetById(int Id);
        ServiceResponse<Product> CreateProduct(Product product);
        ServiceResponse<Product> ArchiveProduct(int Id);

    }
}
