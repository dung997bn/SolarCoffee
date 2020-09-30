using SolarCoffee.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolarCoffee.Services.Interfaces
{
    public interface IOrderService
    {
        List<SalesOrder> GetOrders();
        ServiceResponse<bool> GenerateOpenOrder(SalesOrder order);

        ServiceResponse<bool> MarkFulfilled(int id);
    }
}
