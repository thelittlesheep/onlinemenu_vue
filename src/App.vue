<template>
  <!-- <myheader /> -->
  <el-container>
    <el-header style="padding: 0px">
      <Navbar />

      <!-- <el-affix> </el-affix> -->
    </el-header>
    <el-main>
      <!-- <div>123</div> -->
      <router-view />
      <Menucartdrawer />
    </el-main>
    <el-footer>
      <footer>© 2022 Hank Huang</footer>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import myheader from "@/components/share/header.bodt.vue";
import Navbar from "@/views/Navbar.vue";

export default {
  name: "App",
  components: {
    // myheader,
    Navbar
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
}
html,
body,
#app {
  height: 100%;
}
</style>
