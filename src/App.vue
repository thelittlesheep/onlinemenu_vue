<template>
  <el-container>
    <el-header style="padding: 0px">
      <Navbar />
    </el-header>
    <el-main>
      <router-view />
      <Menucartdrawer />
    </el-main>
    <el-footer>
      <footer>© 2022 Hank Huang</footer>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import Navbar from "@/views/Navbar.vue";
import { ref, watch } from "vue";

export default {
  name: "App",
  components: {
    Navbar
  },
  setup() {
    // const body = ref(document.getElementsByTagName("body")[0].className);
    // const msgBOX = document.getElementsByClassName("el-message-box");

    // console.log(msgBOX);
    // watch(
    //   () => msgBOX,
    //   (newVal) => {
    //     console.log(newVal);
    //   }
    // );
    // let dialogWidth = "350px";
    // let windowSize = document.body.clientWidth;
    // console.log(windowSize);

    // const defaultWidth = 450; // 預設寬度
    // if (windowSize < defaultWidth) {
    //   console.log(123);
    //   dialogWidth = "100%";
    //   if (msgBOX.length > 0) {
    //     console.log(456);
    //     (msgBOX[0] as HTMLElement).style.width = dialogWidth;
    //   }
    // } else {
    //   dialogWidth = defaultWidth + "px";
    // }

    return {};
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
/* .el-popup-parent--hidden
  .el-overlay.is-message-box
  .el-overlay-message-box
  .el-message-box {
  width: auto;
  background: sandybrown;
} */
.deleteUserOrder-confirm {
  background-color: aquamarine;
}
</style>
