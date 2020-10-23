<template>
  <div>
    <h1>Create Invoice</h1>
    <hr />
    <div class="invoice-step" v-if="invoiceStep === 1">
      <h2>Step1: Select Customer</h2>
      <div v-if="customers.length > 0" class="invoice-step-detail">
        <label for="customer">Customer: </label>
        <select
          v-model="selectedCustomerId"
          class="invoiceCustomers"
          id="customer"
        >
          <option disabled value="">Please select a customer</option>
          <option v-for="c in customers" :value="c.id" :key="c.id">
            {{ c.firstName + " " + c.lastName }}
          </option>
        </select>
      </div>
    </div>
    <div class="invoice-step" v-if="invoiceStep === 2"></div>
    <div class="invoice-step" v-if="invoiceStep === 3"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IInvoice, ILineItem } from "@/types/Invoice";
import { ICustomer } from "@/types/Customer";
import { IProductInventory } from "@/types/Product";
import { ISalesOrder } from "@/types/SalesOrder";
import { CustomerService } from "@/services/customer-service";
import { InventoryService } from "@/services/inventory-service";
import { InvoiceService } from "@/services/invoice-service";

const customerService = new CustomerService();
const inventoryService = new InventoryService();
const invoiceService = new InvoiceService();

export default defineComponent({
  name: "CreateInvoice",
  data() {
    return {
      invoiceStep: 1 as number,
      invoice: {} as IInvoice,
      customers: [] as ICustomer[],
      selectedCustomerId: 0 as number,
      inventories: [] as IProductInventory[],
      lineItems: [] as ILineItem[],
      newItems: {
        product: undefined,
        quantity: 0,
      } as ILineItem,
    };
  },
  methods: {
    async initialize(): Promise<void> {
      this.customers = await customerService.getCustomers();
      this.inventories = await inventoryService.getInventory();
    },
  },
  async created() {
    await this.initialize();
  },
});
</script>

<style scoped></style>
