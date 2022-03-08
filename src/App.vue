<template>
  <myheader />
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link :to="{ name: 'Menu' }">Menu</router-link>
  </div>
  <router-view />
  <!-- <footer>Kappa123</footer> -->
</template>

<script lang="ts">
import myheader from "@/components/share/header.bodt.vue";
export default {
  name: "app",
  components: {
    myheader,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
