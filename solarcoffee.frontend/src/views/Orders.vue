<template>
  <div>
    <h1 id="ordersTitle">Sales Orders</h1>
  </div>
  <hr />
  <table id="sales-orders" class="table" v-if="orders.length">
    <thead>
      <tr>
        <th>CustomerId</th>
        <th>OrderId</th>
        <th>Order Total</th>
        <th>Order Status</th>
        <th>Mark Complete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>
          {{ order.customer.id }}
        </td>
        <td>
          {{ order.id }}
        </td>
        <td>
          {{ getTotal(order) }}
        </td>
        <td :class="{ green: order.isPaid }">
          {{ getStatus(order.isPaid) }}
        </td>
        <td>
          <div
            v-if="!order.isPaid"
            class="lni-check-mark-circle order-complete green"
            @click="markComplete(order.id)"
          ></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { OrderService } from "@/services/order-service";
import { ISalesOrder } from "@/types/SalesOrder";
import { ILineItem } from "@/types/Invoice";

const orderService = new OrderService();

export default defineComponent({
  name: "Orders",
  data() {
    return {
      orders: [] as ISalesOrder[],
    };
  },
  computed: {},
  methods: {
    async initialize() {
      this.orders = await orderService.getOrders();
    },
    async markComplete(orderId: number) {
      await orderService.markOrderComplete(orderId);
      this.initialize();
    },
    getTotal(order: ISalesOrder) {
      return order.salesOrderItems.reduce(
        (a: number, b: ILineItem) => a + b.product!.price * b.quantity,
        0
      );
    },
    getStatus(isPaid: boolean) {
      return isPaid ? "Paid is full" : "Unpaid";
    },
  },
  async created() {
    await this.initialize();
  },
});
</script>

<style scoped lang="scss">
@import "@/scss/global.scss";
.green {
  font-weight: bold;
  color: $solar-green;
}
.order-complete {
  cursor: pointer;
  text-align: center;
}
</style>
