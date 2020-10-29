<template>
  <div>
    <h1>Manage Customers</h1>
    <hr />
    <div class="customer-actions">
      <button class="solar-button" @click="showNewCustomer">
        Add Customer
      </button>
    </div>
    <table id="customers" class="table">
      <thead>
        <tr>
          <td>Customer</td>
          <td>Address</td>
          <td>State</td>
          <td>Since</td>
          <td>Delete</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ `${customer.firstName} ${customer.lastName}` }}</td>
          <td>{{ customer.primaryAddress.addressLine1 }}</td>
          <td>{{ customer.primaryAddress.state }}</td>
          <td>{{ formatDate(customer.createdOn) }}</td>
          <td>
            <div
              class="lni-cross-circle customer-delete"
              @click="deleteCustomer(customer.id)"
            ></div>
          </td>
        </tr>
      </tbody>
    </table>

    <new-customer-modal
      v-if="isCustomerModalVisible"
      @save-customer="saveNewCustomer"
      @close-modal="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ICustomer } from "@/types/Customer";
import { CustomerService } from "@/services/customer-service";
import moment from "moment";
import NewCustomerModal from "@/components/modals/NewCustomerModal.vue";

const customerService = new CustomerService();

export default defineComponent({
  name: "Customer",
  components: {
    NewCustomerModal,
  },
  data() {
    return {
      isCustomerModalVisible: false as boolean,
      customers: [] as ICustomer[],
    };
  },
  methods: {
    showNewCustomer() {
      this.isCustomerModalVisible = true;
    },
    formatDate(date: Date) {
      return moment(date).format("MMM Do YY");
    },
    async deleteCustomer(customerId: number) {
      await customerService.deleteCustomer(customerId);
      await this.initialize();
    },
    async initialize() {
      this.customers = await customerService.getCustomers();
    },
    async saveNewCustomer(newCustomer: ICustomer) {
      await customerService.addCustomers(newCustomer);
      this.isCustomerModalVisible = false;
      await this.initialize();
    },
    closeModal() {
      this.isCustomerModalVisible = false;
    },
  },
  async created() {
    await this.initialize();
  },
});
</script>

<style scoped lang="scss">
@import "@/scss/global.scss";

.customer-actions {
  display: flex;
  margin-bottom: 0.8rem;
  div {
    margin-right: 0.8rem;
  }
}
.customer-delete {
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  color: $solar-red;
}
</style>
