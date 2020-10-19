<template>
<solar-modal>
    <template v-slot:"header"> Receive Shipment </template>
    <template v-slot:"body">
        <label for="product">Product Received</label>

        <select v-model="selectedProduct" class="shipmentItems" id="product">
            <option disabled value="">Please select one</option>
            <option v-for="item in inventory" :value="item" :key="item.product.id">{{item.product.name}}</option>
        </select>

        <label for="qtyReceived">Quantity Received</label>
        <input type="number" id="qtyReceived" v-model="qtyReceived" />

    </template>

    <template v-slot:footer>
        <solar-button type="button" @button:click="save" aria-label="Save new shipment">Save Received Shipment</solar-button>
        <solar-button type="button" @button:click="close" aria-label="Close modal">Close</solar-button>
    </template>

</solar-modal>
</template>

<script lang="ts">
import {
    defineComponent,
    PropType
} from "vue";
import SolarButton from "@/components/SolarButton.vue";
import SolarModal from "@/components/modals/SolarModal.vue";
import {
    IProduct,
    IProductInventory
} from "@/types/Product";
export default defineComponent({
    name: "ShipmentModal",
    props: {
        inventory: Array as() => IProductInventory[],
    },
    data() {
        return {
            selectedProduct: {},
            qtyReceived: 0,
        };
    },
    methods: {
        close() {
            this.$emit("close");
        },
    },
});
</script>

<style scoped>
</style>
