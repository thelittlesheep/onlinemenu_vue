<template>
  <!-- <div
    v-for="(data, index) in userWithoutOrders"
    :key="index"
    class="userdata"
  >
    {{ index }}:
    {{ data }}
  </div>
  <br /> -->
  <el-button
    type="primary"
    @click="getUserOrders()"
  >
    Fetch Data
  </el-button>
  <h1>您的訂單</h1>
  <h4>過去的訂單</h4>
  <div
    v-for="(data, index) in user.orders"
    :key="index"
    class="userordersdata"
  >
    <el-card>
      <!-- <span class="order_order_id">訂單編號: {{ data.order_id }}</span
      ><br /> -->
      <span class="order_orderrdate"
        >訂購時間： {{ pinia.displayLocalDateTime(data.order_orderdate) }}</span
      ><br />
      <span class="order_orderrdate"
        >取餐時間：
        {{ pinia.displayLocalDateTime(data.order_pickupdate) }}</span
      ><br />
      <span class="order_order_productlen">
        {{ data.order_products?.length }} 份餐點 </span
      ><br />
      <span class="order_order_totalprice">
        總金額：{{ pinia.getOrderTotalPrice(data.order_products) }} 元
      </span>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";

import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
import { userDTO } from "@/interface/userDTO";

export default defineComponent({
  name: "MyorderBody",
  setup() {
    const pinia = usepinia();
    const { user } = storeToRefs(pinia);
    const userWithoutOrders = ref({}) as Ref<userDTO>;
    async function getUserOrders() {
      try {
        user.value = (await pinia.getUserData(1)).data;
        const { orders, ...restOfuser } = user.value;
        userWithoutOrders.value = restOfuser;
        orders?.forEach((order) => {
          pinia.getOrderSingleProductTotalPrice(order.order_products);
        });
      } catch (e) {
        console.log(e);
      }
    }
    const initLoadData = getUserOrders();

    return { initLoadData, userWithoutOrders, user, pinia, getUserOrders };
  }
});
</script>

<style scoped></style>
