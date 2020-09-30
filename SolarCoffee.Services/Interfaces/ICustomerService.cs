using SolarCoffee.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SolarCoffee.Services.Interfaces
{
    public interface ICustomerService
    {
        public List<Customer> GetAllCustomers();
        public ServiceResponse<Customer> CreateCustomer(Customer customer);
        public ServiceResponse<bool> DeleteCustomer(int id);
        public Customer GetById(int id);
    }
}
