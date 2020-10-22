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
          <td>{{ item.name }}</td>
          <td>{{ item.quantityOnHand }}</td>
          <td>{{ item.product.price }}</td>
          <td>
            <span v-if="item.product.isTaxable"> Yes </span>

            <span v-else> No </span>
          </td>
          <td>
            <div>x</div>
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
import SolarButton from "@/components/SolarButton.vue";
import ShipmentModal from "@/components/modals/ShipmentModal.vue";
import NewProductModal from "@/components/modals/NewProductModal.vue";
import { IShipment } from "@/types/Shipment";

export default defineComponent({
  name: "Inventory",
  components: {
    SolarButton,
    ShipmentModal,
    NewProductModal,
  },
  data() {
    return {
      inventory: [] as IProductInventory[],
      isNewProductVisible: false,
      isShipmentVisible: false,
    };
  },
  methods: {
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
    saveNewShipment(shipment: IShipment) {
      console.log(shipment);
    },
    saveNewProduct(newProduct: IProduct) {
      console.log(newProduct);
    },
  },
});
</script>

<style scoped></style>
