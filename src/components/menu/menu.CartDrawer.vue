<template>
  <div class="drawer">
    <el-drawer
      v-model="drawerVis"
      :direction="direction"
      :size="drawerWidth"
      :custom-class="drawerClass"
    >
      <template #title>
        <h2>您的購物車</h2>
      </template>
      <template #default>
        <div
          v-if="mainstore.isEmptyCart"
          class="emptycart"
        >
          <el-icon :size="96">
            <ShoppingCart />
          </el-icon>
          <div v-if="isLogin">
            您的購物車是空的，趕快去選購吧！
            <br />
            試著加入一些餐點吧！
          </div>
          <div v-else>請先登入，才能使用購物車！</div>
        </div>
        <div
          v-else
          class="menucartitem"
        >
          <Menucartitem />
        </div>
      </template>
      <template
        v-if="!mainstore.isEmptyCart && isLogin"
        #footer
      >
        <el-button
          v-if="isLogin"
          color="black"
          @click="confirmClick"
          >CheckOut</el-button
        >
        <el-button
          v-else
          class="hello-user"
          type="text"
          @click="$router.push('/login')"
          ><span>請先登入，才能使用購物車！</span></el-button
        >
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import { ShoppingCart } from "@element-plus/icons-vue";
import Menucartitem from "./menu.CartItem.vue";

import { mainStore } from "@/store/main.store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { RWDElMessageBox } from "@/util/ElMessageBox.RWD";
// import { cartdata } from "../interfaces/cartDataDTO";

export default defineComponent({
  name: "Menucartdrawer",
  components: { ShoppingCart, Menucartitem },
  setup() {
    const mainstore = mainStore();
    const { drawerVis, cartData, isLogin } = storeToRefs(mainstore);
    const router = useRouter();

    // const isCartEmpty = ref(true);
    const drawerClass =
      mainstore.isEmptyCart === true ? ref("emptyCart") : ref("normalCart");

    watch(cartData.value, (val) => {
      drawerClass.value =
        mainstore.isEmptyCart === true ? "emptyCart" : "normalCart";
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
      RWDElMessageBox();
    };
    function cancelClick() {
      drawerVis.value = false;
    }
    function confirmClick() {
      drawerVis.value = false;
      router.push("/checkout");
    }
    let drawerWidth = "450px";
    function drawerResize() {
      const drawer = document.getElementsByClassName(
        "el-drawer"
      )[0] as HTMLElement;
      let windowSize = document.body.clientWidth;
      const defaultWidth = 450; // 預設寬度
      if (windowSize < defaultWidth) {
        drawerWidth = "100%";
        if (drawer) {
          drawer.style.width = drawerWidth;
        }
      } else {
        if (drawer) {
          drawer.style.width = defaultWidth + "px";
        }
      }
    }
    drawerResize();
    window.addEventListener("resize", drawerResize);
    window.addEventListener("orientationchange", drawerResize);
    return {
      cancelClick,
      confirmClick,
      handleClose,
      drawerVis,
      direction,
      cartData,
      drawerClass,
      isLogin,
      mainstore,
      drawerWidth
    };
  }
});
</script>

<style scoped>
.drawer :deep() .el-drawer__footer {
  display: flex;
  /* background: sandybrown; */
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px 1px black;
  padding-left: 2rem;
  padding-right: 2rem;
}
.el-button {
  flex-grow: 1;
  color: white;
  width: 100%;
  height: 100%;
  display: inline-block;
}
.el-button:hover {
  color: pink;
}
.drawer :deep() .el-drawer__body {
  display: flex;
  justify-content: center;
}
.emptycart {
  /* background: violet; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* .el-drawer.emptyCart .el-drawer__body {
  background: yellowgreen;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-drawer.normalCart .el-drawer__body {
  background: skyblue;
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
} */
</style>
