<template>
  <div class="inventory-container">
    <h1 id="inventoryTitle">Inventory</h1>
    <hr />

    <div class="inventory-actions">
      <solar-button id="addNewBtn" @click="showNewProductModal"
        >Add New Item</solar-button
      >
      <solar-button id="receiveShipment" @click="showShipmentModal"
        >Receive Shipment</solar-button
      >
    </div>
    <table id="inventoryTable" class="table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity On-hand</th>
          <th>Unit Price</th>
          <th>Taxable</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in inventory" :key="item.id">
          <td>{{ item.product.name }}</td>
          <td
            v-bind:class="
              `${applyColor(item.quantityOnHand, item.idealQuantity)}`
            "
          >
            {{ item.quantityOnHand }}
          </td>
          <td>{{ item.product.price }}</td>
          <td>
            <span v-if="item.product.isTaxable"> Yes </span>

            <span v-else> No </span>
          </td>
          <td>
            <div
              class="lni-cross-circle product-archive"
              @click="archiveProduct(item.product.id)"
            ></div>
          </td>
        </tr>
      </tbody>
    </table>

    <shipment-modal
      v-if="isShipmentVisible"
      :inventory="inventory"
      @save-shipment="saveNewShipment"
      @close-modal="closeModals"
    ></shipment-modal>

    <new-product-modal
      v-if="isNewProductVisible"
      @save-product="saveNewProduct"
      @close-modal="closeModals"
    >
    </new-product-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IProduct, IProductInventory } from "@/types/Product";
import { InventoryService } from "@/services/inventory-service";
import { ProductService } from "@/services/product-service";
import SolarButton from "@/components/SolarButton.vue";
import ShipmentModal from "@/components/modals/ShipmentModal.vue";
import NewProductModal from "@/components/modals/NewProductModal.vue";
import { IShipment } from "@/types/Shipment";

const inventoryService = new InventoryService();
const productService = new ProductService();

export default defineComponent({
  name: "Inventory",
  components: {
    SolarButton,
    ShipmentModal,
    NewProductModal,
  },
  async created() {
    this.initialize();
  },
  data() {
    return {
      inventory: [] as IProductInventory[],
      isNewProductVisible: false,
      isShipmentVisible: false,
    };
  },
  methods: {
    async initialize() {
      this.inventory = await inventoryService.getInventory();     
    },
    applyColor(current: number, target: number) {
      if (current <= 0) {
        return "red";
      } else if (Math.abs(target - current) > 8) {
        return "yellow";
      }
      return "green";
    },
    closeModals() {
      this.isNewProductVisible = false;
      this.isShipmentVisible = false;
    },
    showNewProductModal() {
      this.isNewProductVisible = true;
    },
    showShipmentModal() {
      this.isShipmentVisible = true;
    },
    async saveNewShipment(shipment: IShipment) {
      await inventoryService.updateInventoryQuantity(shipment);
      this.isShipmentVisible = false;
      await this.initialize();
    },
    async saveNewProduct(newProduct: IProduct) {
      debugger;
      await productService.save(newProduct);
      this.isNewProductVisible=false;
      await this.initialize();
    },
    async archiveProduct(productId: number) {
      await productService.archive(productId);
      await this.initialize();
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/scss/global.scss";

.green {
  font-weight: bold;
  color: $solar-green;
}

.yellow {
  font-weight: bold;
  color: $solar-yellow;
}

.red {
  font-weight: bold;
  color: $solar-red;
}

.inventory-actions {
  display: flex;
  margin-bottom: 0.8rem;
}

.product-archive {
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  color: $solar-red;
}
</style>
