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
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Checkoutcarttable from "./checkout.CartTable.vue";
import Checkoutorderdetail from "./checkout.Orderdetail.vue";

export default defineComponent({
  name: "CheckoutBody",
  components: {
    Checkoutcarttable,
    Checkoutorderdetail
  },
  setup() {
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
