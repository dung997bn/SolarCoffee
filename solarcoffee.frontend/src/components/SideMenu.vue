<template>
<div class="side-menu-container">
    <router-link to="/">
        <img id="imgLogo" alt="Solar Coffee logo" src="../assets/images/solar_coffee_logo.png" />
    </router-link>

    <h1>Management</h1>
    <solar-button id="menuInventory" :isFullWidth="true" :link="'/inventory'">Inventory</solar-button>
    <solar-button id="menuCustomers" :isFullWidth="true" :link="'/customers'">Manage Customer</solar-button>
    <solar-button id="menuInvoice" :isFullWidth="true" :link="'/invoice/new'">New Invoice</solar-button>
    <solar-button id="menuOrders" :isFullWidth="true" :link="'/orders'">Orders</solar-button>
</div>
</template>

<script lang="ts">
import {
    defineComponent
} from "vue";
import SolarButton from "@/components/SolarButton.vue";

export default defineComponent({
    name: "SideMenu",
    components: {
        SolarButton,
    },
});
</script>

<style lang="scss" scoped>
@import "@/scss/global.scss";

.side-menu-container {
    background-color: #fcfcfc;
    height: 100vh;
    width: $menu-width;
    display: flex;
    flex-direction: column;
    padding: 0.8rem;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
    box-sizing: border-box;
}

#imgLogo {
    width: 100%;
}

h1 {
    font-size: 1.2rem;
    margin: 1rem 0;
}
</style>
