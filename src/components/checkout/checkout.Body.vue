<template>
  <Menuproductpopout />
  <div class="Checkoutbody">
    <div class="Checkoutcartdiv">
      <h1>商品明細</h1>
      <Checkoutcarttable />
    </div>
    <div class="Checkoutdetail">
      <h1>訂單詳細資料</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Checkoutcarttable from "./checkout.CartTable.vue";

import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "CheckoutBody",
  components: {
    Checkoutcarttable
  },
  setup() {
    const pinia = usepinia();
    const { menudatas } = storeToRefs(pinia);

    async function getMenuDatas() {
      // isLoading.value = true;
      try {
        const res = await pinia.getMenuData();
        menudatas.value = res.data;
        // isLoading.value = false;

        // 測試 isLoadingData 控制用
        // menudatas.value = [];
        // setTimeout(() => {
        //   menudatas.value = res.data;
        //   isLoadingData.value = false;
        // }, 3000);
      } catch (e: unknown) {
        // const errors = e as AxiosError<responseError>;
        console.log(e);
      }
    }
    async function isDataReceive() {
      await getMenuDatas();
      // isLoading.value = menudatas.value.length !== 0 ? false : true;
    }

    const initLoadData = isDataReceive();
    return {};
  }
});
</script>

<style scoped>
.Checkoutbody {
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* height: 80vh; */
  /* background: lightblue; */
}
.Checkoutdetail {
  margin-top: 3vh;
  /* background: antiquewhite; */
}
</style>
