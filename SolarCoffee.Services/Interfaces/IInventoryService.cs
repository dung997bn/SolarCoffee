using SolarCoffee.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolarCoffee.Services.Interfaces
{
    public interface IInventoryService
    {
        List<ProductInventory> GetCurrentInventory();
        ServiceResponse<ProductInventory> UpdateUnitsAvailable(int id, int adjustment);
        ProductInventory GetByProductId(int productId);
        List<ProductInventorySnapshot> GetSnapshotHistory();
    }
}
