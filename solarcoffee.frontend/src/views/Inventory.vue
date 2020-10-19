<template>
<div class="inventory-container">
    <h1 id="inventoryTitle">Inventory</h1>
    <hr />

    <div class="inventory-actions">
        <solar-button id="addNewBtn" @click.native="showNewProductModal">Add New Item</solar-button>
        <solar-button id="receiveShipment" @click.native="showShipmentModal">Receive Shipment</solar-button>
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

    <shipment-modals v-if="isShipmentVisible" :inventory="inventory" @close="closeModals"></shipment-modals>
</div>
</template>

<script lang="ts">
import {
    defineComponent
} from "vue";
import {
    IProductInventory
} from "@/types/Product";
import SolarButton from "@/components/SolarButton.vue";
import ShipmentModals from "@/components/modals/ShipmentModals.vue";

export default defineComponent({
    name: "Inventory",
    components: {
        SolarButton,
        ShipmentModals,
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
            (this.isNewProductVisible = false), (this.isShipmentVisible = false);
        },
        showNewProductModal() {},
        showShipmentModal() {},
    },
});
</script>

<style scoped>
</style>
