<template>
  <div class="btn-link">
    <button
      v-if="link"
      @click="visitRoute"
      :class="['solar-button', { 'full-width': isFullWidth }]"
      type="button"
    >
      <slot></slot>
    </button>

    <button
      v-else
      @click="onClick"
      :class="['solar-button', { 'full-width': isFullWidth }]"
      type="button"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SolarButton",
  components: {},
  props: {
    link: String,
    isFullWidth: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    visitRoute() {
      this.$router.push(this.$props.link!);
    },
    onClick() {
      this.$emit("button-click");
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/global.scss";

</style>
