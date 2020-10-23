<template>
  <solar-modal>
    <template v-slot:header> Receive Shipment </template>
    <template v-slot:body>
      <label for="product">Product Received</label>

      <select v-model="selectedProduct" class="shipmentItems" id="product">
        <option disabled value="">Please select one</option>
        <option
          v-for="item in inventory"
          :value="item.product"
          :key="item.product.id"
        >
          {{ item.product.name }}
        </option>
      </select>

      <label for="qtyReceived">Quantity Received</label>
      <input type="number" id="qtyReceived" v-model="qtyReceived" />
    </template>

    <template v-slot:footer>
      <button
        type="button"
        @click="save"
        aria-label="Save new shipment"
        class="solar-button full-width"
      >
        Save Received Shipment
      </button>
      <button
        type="button"
        @click="close"
        aria-label="Close modal"
        class="solar-button full-width"
      >
        Close
      </button>
    </template>
  </solar-modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import SolarButton from "@/components/SolarButton.vue";
import SolarModal from "@/components/modals/SolarModal.vue";
import { IProduct, IProductInventory } from "@/types/Product";
import { IShipment } from "@/types/Shipment";
export default defineComponent({
  name: "ShipmentModal",
  components: {
    SolarModal,
  },
  props: {
    inventory: Array as () => IProductInventory[],
  },
  data() {
    return {
      selectedProduct: {} as IProduct,
      qtyReceived: 0,
    };
  },
  methods: {
    close() {
      this.$emit("close-modal");
    },
    save() {
      debugger;
      const shipment: IShipment = {
        productId: this.selectedProduct.id,
        adjustment: this.qtyReceived,
      };

      this.$emit("save-shipment", shipment);
    },
  },
});
</script>

<style scoped></style>
