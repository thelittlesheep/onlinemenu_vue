<template>
  <Menuproductpopout />
  <div class="menuBody">
    <div v-if="isLoading">
      <loading
        v-model:active="isLoading"
        :can-cancel="true"
        :on-cancel="onCancel"
        :is-full-page="true"
      >
        <div>
          <div class="loadingio-spinner-spinner-2uqnsxvpidy">
            <div class="ldio-0jwyk1jbj2ug">
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </loading>
    </div>
    <div v-else>
      <div class="menuHeader">
        <!-- <el-button
          class="opencartbutton"
          type="primary"
          @click="drawerVis = true"
        >
          購物車
        </el-button> -->
      </div>
      <Menutable />
      <!-- <div
        name="fetch button"
        class="m-3"
      >
        <div v-if="!isLoading">
          <el-button
            type="primary"
            @click="getMenuDatas()"
          >
            Fetch Data
          </el-button>
        </div>
        <div v-else>
          <el-button
            type="primary"
            loading
          >
            Fetching Data
          </el-button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// import loading component
import "vue-loading-overlay/dist/vue-loading.css";
import Loading from "vue-loading-overlay";

import { mainStore } from "@/store/main.store";
import { storeToRefs } from "pinia";

import Menutable from "./menu.ProductTable.vue";

export default defineComponent({
  name: "MenuBody",
  components: { Loading, Menutable },
  setup() {
    // init pinia
    const mainstore = mainStore();
    const { menudatas, drawerVis } = storeToRefs(mainstore);
    const isLoading = ref(true);

    function onCancel() {
      console.log("User cancelled the loader.");
      isLoading.value = false;
    }
    async function getMenuDatas() {
      isLoading.value = true;
      try {
        const res = await mainstore.getMenuData();
        menudatas.value = res.data;
        isLoading.value = false;

        // 測試 isLoadingData 控制用
        // menudatas.value = [];
        // setTimeout(() => {
        //   menudatas.value = res.data;
        //   isLoadingData.value = false;
        // }, 3000);
      } catch (e: unknown) {
        console.log(e);
      }
    }
    async function isDataReceive() {
      await getMenuDatas();
      isLoading.value = menudatas.value.length !== 0 ? false : true;
    }

    const initLoadData = isDataReceive();

    return {
      isLoading,
      initLoadData,
      drawerVis,
      menudatas,
      onCancel,
      getMenuDatas
    };
  }
});
</script>

<style>
.menuBody {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}
.menuHeader {
  display: flex;
  flex-direction: row-reverse;
}
@keyframes ldio-0jwyk1jbj2ug {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.ldio-0jwyk1jbj2ug div {
  left: 94px;
  top: 48px;
  position: absolute;
  animation: ldio-0jwyk1jbj2ug linear 1s infinite;
  background: #fe718d;
  width: 12px;
  height: 24px;
  border-radius: 6px / 8.64px;
  transform-origin: 6px 52px;
}
.ldio-0jwyk1jbj2ug div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -0.9166666666666666s;
  background: #fe718d;
}
.ldio-0jwyk1jbj2ug div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -0.8333333333333334s;
  background: #f47e60;
}
.ldio-0jwyk1jbj2ug div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.75s;
  background: #f8b26a;
}
.ldio-0jwyk1jbj2ug div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.6666666666666666s;
  background: #abbd81;
}
.ldio-0jwyk1jbj2ug div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.5833333333333334s;
  background: #849b87;
}
.ldio-0jwyk1jbj2ug div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.5s;
  background: #6492ac;
}
.ldio-0jwyk1jbj2ug div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.4166666666666667s;
  background: #637cb5;
}
.ldio-0jwyk1jbj2ug div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.3333333333333333s;
  background: #6a63b6;
}
.ldio-0jwyk1jbj2ug div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.25s;
  background: #fe718d;
}
.ldio-0jwyk1jbj2ug div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.16666666666666666s;
  background: #f47e60;
}
.ldio-0jwyk1jbj2ug div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.08333333333333333s;
  background: #f8b26a;
}
.ldio-0jwyk1jbj2ug div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
  background: #abbd81;
}
.loadingio-spinner-spinner-2uqnsxvpidy {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: #ffffff;
}
.ldio-0jwyk1jbj2ug {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-0jwyk1jbj2ug div {
  box-sizing: content-box;
}
/* generated by https://loading.io/ */
</style>
