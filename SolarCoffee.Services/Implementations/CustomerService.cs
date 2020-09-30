using Microsoft.EntityFrameworkCore;
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
    public class CustomerService : ICustomerService
    {
        private readonly SolarDbContext _db;

        public CustomerService(SolarDbContext db)
        {
            _db = db;
        }

        public ServiceResponse<Customer> CreateCustomer(Customer customer)
        {
            try
            {
                _db.Customers.Add(customer);
                _db.SaveChanges();
                return new ServiceResponse<Data.Models.Customer>
                {
                    IsSuccess = true,
                    Message = "New customer added",
                    Time = DateTime.UtcNow,
                    Data = customer
                };
            }
            catch (Exception e)
            {
                return new ServiceResponse<Data.Models.Customer>
                {
                    IsSuccess = false,
                    Message = e.StackTrace,
                    Time = DateTime.UtcNow,
                    Data = customer
                };
            }
        }

        public ServiceResponse<bool> DeleteCustomer(int id)
        {
            var customer = _db.Customers.Find(id);
            var now = DateTime.UtcNow;

            if (customer == null)
            {
                return new ServiceResponse<bool>
                {
                    Time = now,
                    IsSuccess = false,
                    Message = "Customer to delete not found!",
                    Data = false
                };
            }

            try
            {
                _db.Customers.Remove(customer);
                _db.SaveChanges();

                return new ServiceResponse<bool>
                {
                    Time = now,
                    IsSuccess = true,
                    Message = "Customer created!",
                    Data = true
                };
            }
            catch (Exception e)
            {
                return new ServiceResponse<bool>
                {
                    Time = now,
                    IsSuccess = false,
                    Message = e.StackTrace,
                    Data = false
                };
            }
        }

        public List<Customer> GetAllCustomers()
        {
            return _db.Customers
               .Include(customer => customer.PrimaryAddress)
               .OrderBy(customer => customer.LastName)
               .ToList();
        }

        public Customer GetById(int id)
        {
            return _db.Customers.Include(customer => customer.PrimaryAddress)
               .OrderBy(customer => customer.LastName).Where(c => c.Id == id).SingleOrDefault();
        }
    }
}
