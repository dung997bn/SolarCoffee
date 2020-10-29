import { createRouter, createWebHistory } from "vue-router";
import Inventory from "@/views/Inventory.vue";
var routes = [
    {
        path: "/",
        name: "home",
        component: Inventory,
    },
    {
        path: "/inventory",
        name: "inventory",
        component: Inventory,
    },
    {
        path: "/customers",
        name: "Customers",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () { return import("@/views/Customers.vue"); },
    },
    {
        path: "/orders",
        name: "Orders",
        component: function () { return import("@/views/Orders.vue"); },
    },
    {
        path: "/invoice/new",
        name: "New Invoice",
        component: function () { return import("@/views/CreateInvoice.vue"); },
    },
];
var router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes,
});
export default router;
//# sourceMappingURL=index.js.map