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
          class="solar-button"
          :disabled="!newItem.product || !newItem.quantity"
          @click="addLineItem"
        >
          Add Line Item
        </button>
        <button
          :disabled="!lineItems.length"
          @click="finalizeOrder"
          class="solar-button"
        >
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
    <div class="invoice-step" v-if="invoiceStep === 3">
      <h2>Review and Submit</h2>
      <button @click="submitInvoice" class="solar-button">
        Submit Invoice
      </button>
      <hr />
      <div class="invoice-step-detail" id="invoice" ref="invoice">
        <div class="invoice-logo">
          <img
            src="../assets/images/solar_coffee_logo.png"
            alt="Solar Coffee Logo"
            id="imgLogo"
          />
          <h4>1337 Solar Lane</h4>
          <h4>San somewhere, CA 90000</h4>
          <h4>USA</h4>

          <div class="invoice-order-list" v-if="lineItems.length">
            <div class="invoice-header">
              <h4>Invoice : {{ new Date() }}</h4>
              <h4>
                Customer:
                {{
                  selectedCustomer.firstName + " " + selectedCustomer.lastName
                }}
              </h4>
              <h4>
                Address:
                {{ selectedCustomer.primaryAddress.addressLine1 || "" }} ,
                {{ selectedCustomer.primaryAddress.city }},
                {{ selectedCustomer.primaryAddress.state }},
                {{ selectedCustomer.primaryAddress.postalCode }},
                {{ selectedCustomer.primaryAddress.country }}
              </h4>
            </div>

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
                <tr>
                  <td colspan="4"></td>
                  <td>Grand total</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" class="due">Balance due upon receipt:</td>
                  <td class="price-final">{{ runningTotal }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="invoice-steps-actions">
      <button class="solar-button" @click="prev" :disabled="!canGoPrev">
        Previous
      </button>
      <button class="solar-button" @click="next" :disabled="!canGoNext">
        Next
      </button>
      <button class="solar-button" @click="startOver">Start over</button>
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
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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
        ) as ILineItem;
        let currentQuantity = Number(lineItem.quantity);
        const updatedQuantity = (currentQuantity += newItem.quantity);
        lineItem.quantity = updatedQuantity;
      } else {
        this.lineItems.push(this.newItem);
      }
      this.newItem = { product: undefined, quantity: 0 };
    },
    async submitInvoice(): Promise<void> {
      this.invoice = {
        customerId: this.selectedCustomerId,
        lineItems: this.lineItems,
      };
      await invoiceService.makeNewInvoice(this.invoice);
      this.dowloadPdf();
      await this.$router.push("/orders");
    },
    dowloadPdf() {
      debugger;
      const pdf = new jsPDF("p", "pt", "a4", true);
      const invoice = document.getElementById("invoice")!;
      const width = (this.$refs["invoice"] as any).clientWidth;
      const height = (this.$refs["invoice"] as any).clientHeight;

      html2canvas(invoice).then((canvas) => {
        const image = canvas.toDataURL("image/png");
        pdf.addImage(image, "PNG", 0, 0, width * 0.55, height * 0.55);
        pdf.save("invoice");
      });
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
        (a: number, b: ILineItem) => a + b.product!.price * b.quantity,
        0
      );
    },
    canGoPrev(): boolean {
      return this.invoiceStep !== 1;
    },
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
    selectedCustomer(): ICustomer {
      return this.customers.find((c) => c.id === this.selectedCustomerId)!;
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
