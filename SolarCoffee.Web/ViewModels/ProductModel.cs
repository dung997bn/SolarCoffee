using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolarCoffee.Web.ViewModels
{
    public class ProductModel
    {
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool IsTaxable { get; set; }
        public bool IsArchived { get; set; }
    }

    public class ProductInventoryModel
    {
        public int Id { get; set; }
        public int QuantityOnHand { get; set; }
        public int IdealQuantity { get; set; }
        public ProductModel Product { get; set; }
    }

    public class ProductInventorySnapshotModel
    {
        public List<int> QuantityOnHand { get; set; }
        public int ProductId { get; set; }
    }

    public class SnapshotResponse
    {
        public List<ProductInventorySnapshotModel> ProductInventorySnapshots { get; set; }
        public List<DateTime> Timeline { get; set; }
    }
}

