<template>
  <solar-modal>
    <template v-slot:header> Receive Shipment </template>
    <template v-slot:body>
      <ul class="newProduct">
        <li>
          <label for="isTaxable">Is this product taxable?</label>
          <input
            type="checkbox"
            id="isTaxable"
            v-model="newProduct.isTaxable"
          />
        </li>
        <li>
          <label for="productName">Name</label>
          <input type="text" id="productName" v-model="newProduct.name" />
        </li>
        <li>
          <label for="productDesc">Description</label>
          <input
            type="text"
            id="productDesc"
            v-model="newProduct.desctiption"
          />
        </li>
        <li>
          <label for="productPrice">Price (USD)</label>
          <input type="number" id="productPrice" v-model="newProduct.price" />
        </li>
      </ul>
    </template>

    <template v-slot:footer>
      <button
        type="button"
        @click="save"
        aria-label="save new item"
        class="solar-button full-width"
      >
        Save Product
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
import { defineComponent } from "vue";
import { IProduct, IProductInventory } from "@/types/Product";
import SolarModal from "@/components/modals/SolarModal.vue";
import SolarButton from "@/components/SolarButton.vue";
export default defineComponent({
  name: "NewProductModal",
  components: {
    SolarModal,
    // SolarButton,
  },
  data() {
    return {
      newProduct: {} as IProduct,
    };
  },
  methods: {
    close() {
      this.$emit("close-modal");
    },
    save() {
      this.$emit("save-product", this.newProduct);
    },
  },
});
</script>

<style scoped lang="scss">
.newProduct {
  list-style: none;
  padding: 0;
  margin: 0;

  input {
    width: 100%;
    height: 1.8rem;
    margin-bottom: 1.2rem;
    font-size: 1.1rem;
    line-height: 1.3rem;
    padding: 0.2rem;
    color: #555;
  }

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.3rem;
  }
}
</style>
