<template>
  <div>
    <apexchart
      :width="'100%'"
      type="area"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script lang="ts">
import { ApexOptions } from "apexcharts";
import { defineComponent } from "vue";
import VueApexCharts from "vue-apexcharts";
import { IInventoryTimeline } from "@/types/InventoryGraph";
import { get, sync, call } from "vuex-pathify";
import store from "@/store";

export default defineComponent({
  name: "InventoryChart",
  components: {
    VueApexCharts,
  },
  data() {
    return {
      snapshotTimeline: {} as IInventoryTimeline,
      isTimelineBuilt: false,
    };
  },
  methods: {
    getOptions() {
      return {
        dataLabels: { enabled: false },
        fill: {
          type: "gradient",
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          categories: this.snapshotTimeline.timeline,
          type: "datetime",
        },
      } as ApexOptions;
    },
  },
  async created() {
    await store.dispatch("assignSnapshot");
  },
});
</script>

<style scoped></style>
