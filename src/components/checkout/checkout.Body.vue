<template>
  <Menuproductpopout />
  <div class="Checkoutbody">
    <div class="Checkoutcartdiv">
      <h1>商品明細</h1>
      <Checkoutcarttable />
    </div>
    <div class="Checkoutdetail">
      <h1>訂單詳細資料</h1>
      <Checkoutorderdetail />
    </div>
  </div>
  <div>
    <el-button
      color="primary"
      @click="sentOrder"
      >CheckOut</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mainStore } from "@/store/main.store";
import { storeToRefs } from "pinia";

import Checkoutcarttable from "./checkout.CartTable.vue";
import Checkoutorderdetail from "./checkout.Orderdetail.vue";
import moment from "moment";
import { useRouter } from "vue-router";
import { userStore } from "@/store/user.store";

export default defineComponent({
  name: "CheckoutBody",
  components: {
    Checkoutcarttable,
    Checkoutorderdetail
  },
  setup() {
    const mainstore = mainStore();
    const { order, cartData } = storeToRefs(mainstore);
    const { userInfo } = storeToRefs(userStore());
    const router = useRouter();

    async function sentOrder() {
      order.value.user_id = userInfo.value.user_id;
      // 需要
      order.value.order_products = cartData.value;
      order.value.order_quantity = order.value.order_products?.length;
      order.value.order_orderdate = moment
        .utc(moment())
        .format("YYYY-MM-DD HH:mm:ss");
      try {
        const res = await mainstore.postMenuCartData(order);
        if (res.status === 201) {
          alert("訂單已送出");
          router.push("/menu");
          cartData.value = [];
        }
      } catch (e) {
        console.log(e);
      }
    }
    return { sentOrder, mainstore };
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
