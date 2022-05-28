<template>
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
import { ElMessageBox } from "element-plus";
import { RWDElMessageBox } from "@/util/ElMessageBox.RWD";
import { Iorderproduct } from "@/interface/orderDTO";

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
      // 需要修正購物車與訂單的資料型態
<<<<<<< HEAD
      // order.value.order_products = cartData.value as unknown as Iorderproduct[];
      order.value.order_products = [];
      cartData.value.forEach((product) => {
        order.value.order_products?.push({
          order_product_id: product.product_id,
          product_name: product.product_name,
          product_price: product.product_price,
          order_product_quantity: product.shoppingProduct_qty,
          order_product_adjustitem: product.shoppingProduct_adjustitems,
          order_product_finalprice: product.shoppingProduct_finalPrice
        });
=======
      order.value.order_products = [] as Iorderproduct[];
      cartData.value.forEach((product) => {
        const orderProduct = {
          order_product_id: product.product_id,
          order_product_quantity: product.shoppingProduct_qty,
          order_product_adjustitem: product.shoppingProduct_adjustitems,
          product_name: product.product_name,
          product_price: product.product_price,
          order_product_finalprice: product.product_price
        } as Iorderproduct;
        order.value.order_products?.push(orderProduct);
>>>>>>> origin/FixCartItemDateStructure
      });
      order.value.order_quantity = order.value.order_products?.reduce(
        (acc, cur) => {
          // need to adjust type error
          return acc + cur.order_product_quantity;
        },
        0
      );
      order.value.order_orderdate = moment
        .utc(moment())
        .format("YYYY-MM-DD HH:mm:ss");
      try {
        const res = await mainstore.postMenuCartData(order);
        if (res.status === 201) {
          // alert("訂單已送出");
          ElMessageBox.alert("訂單已送出", {
            confirmButtonText: "確認",
            type: "success"
          }).then(() => {
            router.push("/myorder");
            cartData.value = [];
          });
          RWDElMessageBox();
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
  max-width: 1200px;
  display: flex;
  flex-direction: column;
}
.Checkoutdetail {
  margin-top: 3vh;
}
</style>
