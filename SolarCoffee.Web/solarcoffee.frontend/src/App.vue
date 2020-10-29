<template>
  <div id="app-menu">
    <side-menu />
  </div>
  <div id="app-content">
    <router-view />
  </div>
</template>

<script lang="ts">
import SideMenu from "@/components/SideMenu.vue";
export default {
  name: "App",
  components: {
    SideMenu,
  },
};
</script>

<style lang="scss">
@import "@/scss/global.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}

#app-menu {
  position: fixed;
}

#app-content {
  padding: 1.2rem;
  width: 90%;
  margin: 1rem auto 1rem $menu-width;
  text-align: left;
}

* {
  margin: 0;
}

a {
  text-decoration: none;
}
</style>
