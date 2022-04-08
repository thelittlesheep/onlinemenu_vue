<template>
  <el-drawer
    v-model="drawer"
    :direction="direction"
    size="450px"
    :custom-class="drawerClass"
  >
    <template #title>
      <h2>BurGers</h2>
    </template>
    <template #default>
      <div
        v-if="cartData.length === 0"
        class="emptycart"
      >
        <el-icon size="96px">
          <ShoppingCart />
        </el-icon>
        <div>
          Your Cart is Empty
          <br />
          Try to add somthing
        </div>
      </div>
      <div
        v-else
        class="menucartitem"
      >
        <Menucartitem />
      </div>
    </template>
    <template #footer>
      <div>
        <el-button
          color="black"
          @click="confirmClick"
          >CheckOut</el-button
        >
      </div>
      <!-- <button @click="confirmClick">confirm</button> -->
    </template>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import { ShoppingCart } from "@element-plus/icons-vue";
import Menucartitem from "./menuCartItem.vue";

import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
// import { cartdata } from "../interfaces/cartDataDTO";

export default defineComponent({
  name: "Menucartdrawer",
  components: { ShoppingCart, Menucartitem },
  setup() {
    const pinia = usepinia();
    const { drawer, cartData } = storeToRefs(pinia);

    // const isCartEmpty = ref(true);
    const drawerClass =
      pinia.isEmptyCart === true ? ref("emptyCart") : ref("normalCart");

    watch(cartData.value, (val) => {
      drawerClass.value =
        pinia.isEmptyCart === true ? "emptyCart" : "normalCart";
    });

    // const drawer = ref(false);
    const direction = ref("rtl");
    const handleClose = (done: () => void) => {
      ElMessageBox.confirm("Are you sure you want to close this?")
        .then(() => {
          done();
        })
        .catch(() => {
          // catch error
        });
    };
    function cancelClick() {
      drawer.value = false;
    }
    function confirmClick() {
      console.log("confirm");
    }
    return {
      cancelClick,
      confirmClick,
      handleClose,
      drawer,
      direction,
      cartData,
      drawerClass
    };
  }
});
</script>

<style>
.el-drawer__footer {
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px 1px black;
  height: 10%;
}
.el-drawer__footer div {
  width: 100%;
  height: 80%;
  margin-top: 2%;
  margin-bottom: 1%;
  display: inline-block;
}
.el-drawer__footer .el-button {
  /* background: black; */
  color: white;
  width: 100%;
  height: 100%;
  display: inline-block;
}
.el-drawer__footer .el-button:hover {
  color: pink;
}
.el-drawer.emptyCart .el-drawer__body {
  /* background: yellowgreen; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.emptycart {
  /* background: violet; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* padding-left: 10%;
  padding-right: 10%; */
}

.el-drawer.normalCart .el-drawer__body {
  /* background: lightcyan; */
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}

.el-drawer.normalCart .el-drawer__body .menucartitem {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}
</style>
