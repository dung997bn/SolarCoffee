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
          class="invoice-customers"
          id="customer"
        >
          <option disabled value="">Please select a customer</option>
          <option v-for="c in customers" :value="c.id" :key="c.id">
            {{ c.firstName + " " + c.lastName }}
          </option>
        </select>
      </div>
    </div>
    <div class="invoice-step" v-if="invoiceStep === 2">
      <h2>Step 2: Create Order</h2>
      <div v-if="inventories.length" class="invoice-step-detail">
        <label for="product">Product:</label>
        <select v-model="newItem.product" class="invoiceLineItem" id="product">
          <option disabled value="">Please select a product</option>
          <option
            v-for="i in inventories"
            :value="i.product"
            :key="i.product.id"
          >
            {{ i.product.name }}
          </option>
        </select>

        <label for="quantity">Quantity:</label>
        <input v-model="newItem.quantity" id="quantity" type="number" min="0" />
      </div>

      <div class="invoice-item-actions">
        <button
          :disabled="!newItem.product || newItem.quantity"
          @click="addLineItem"
        >
          Add Line Item
        </button>
        <button :disabled="!lineItems.length" @click="finalizeOrder">
          Finalize Order
        </button>
      </div>

      <div class="invoice-order-list" v-if="lineItems.length">
        <div class="runningTotal">
          <h3>Running Total:</h3>
          {{ runningTotal }}
        </div>
        <hr />
        <table class="table">
          <thead>
            <tr>
              <td>Product</td>
              <td>Description</td>
              <td>Quantity</td>
              <td>Price</td>
              <td>Subtotal</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="lineItem in lineItems"
              :key="`index_${lineItem.product.id}`"
            >
              <td>{{ lineItem.product.name }}</td>
              <td>{{ lineItem.product.description }}</td>
              <td>{{ lineItem.quantity }}</td>
              <td>{{ lineItem.product.price }}</td>
              <td>{{ lineItem.product.price * lineItem.quantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="invoice-step" v-if="invoiceStep === 3"></div>
    <hr />
    <div class="invoice-steps-actions">
      <button @click="prev" :disabled="!canGoPrev">Previous</button>
      <button @click="next" :disabled="!canGoNext">Next</button>
      <button @click="startOver">Start over</button>
    </div>
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
      newItem: {
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
    prev(): void {
      if (this.invoiceStep === 1) return;
      this.invoiceStep -= 1;
    },
    next(): void {
      if (this.invoiceStep === 3) return;
      this.invoiceStep += 1;
    },
    addLineItem() {
      const newItem: ILineItem = {
        product: this.newItem.product!,
        // quantity: parseInt(this.newItem.quantity.toString())
        quantity: Number(this.newItem.quantity.toString()),
      };

      const existingItems = this.lineItems.map((item) => item.product?.id);

      if (existingItems.includes(newItem.product?.id)) {
        const lineItem = this.lineItems.find(
          (item) => item.product?.id === newItem.product?.id
        );
        lineItem.quantity = Number(this.lineItems.quantity) += newItem.quantity;
      } else {
        this.lineItems.push(this.newItem);
      }
      this.newItem = { product: undefined, quantity: 0 };
    },
    finalizeOrder() {
      this.invoiceStep = 3;
    },
    startOver() {
      this.invoice = {} as IInvoice;
      this.invoiceStep = 1;
    },
  },
  async created() {
    await this.initialize();
  },
  computed: {
    runningTotal(): number {
      return this.lineItems.reduce(
        (a, b) => a + b["product"]!["price"] * b["quantity"],
        0
      );
    },
    canGoPrev() {},
    canGoNext(): boolean {
      if (this.invoiceStep == 1) {
        return this.selectedCustomerId !== 0;
      }
      if (this.invoiceStep === 2) {
        return true;
      }
      if (this.invoiceStep === 3) {
        return false;
      }
      return false;
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/scss/global.scss";
.invoice-steps-actions {
  display: flex;
  width: 100%;
}

.invoice-step-detail {
  margin: 1.2rem;
}
.invoice-order-list {
  margin-top: 1.2rem;
  padding: 0.8rem;
  .line-item {
    display: flex;
    border-bottom: 1px dashed #ccc;
    padding: 0.8rem;
  }
  .item-col {
    flex-grow: 1;
  }
}
.invoice-item-actions {
  display: flex;
}
.price-pre-tax {
  font-weight: bold;
}
.price-final {
  font-weight: bold;
  color: $solar-green;
}
.due {
  font-weight: bold;
}
.invoice-header {
  width: 100%;
  margin-bottom: 1.2rem;
}
.invoice-logo {
  padding-top: 1.4rem;
  text-align: center;
  img {
    width: 280px;
  }
}
</style>
