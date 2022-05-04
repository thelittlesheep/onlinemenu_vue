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
  <div v-if="user">
    <div
      v-for="(data, index) in user.orders"
      :key="index"
      class="userordersdata"
    >
      <el-card>
        <!-- <span class="order_order_id">訂單編號: {{ data.order_id }}</span
      ><br /> -->
        <span class="order_orderrdate"
          >訂購時間：
          {{ mainstore.displayLocalDateTime(data.order_orderdate) }}</span
        ><br />
        <span class="order_orderrdate"
          >取餐時間：
          {{ mainstore.displayLocalDateTime(data.order_pickupdate) }}</span
        ><br />
        <span class="order_order_productlen">
          {{ data.order_products?.length }} 份餐點 </span
        ><br />
        <span class="order_order_totalprice">
          總金額：{{ mainstore.getOrderTotalPrice(data.order_products) }} 元
        </span>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";

import { userStore } from "@/store/user.store";
import { storeToRefs } from "pinia";
import { userDTO } from "@/interface/userDTO";
import { mainStore } from "@/store/main.store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MyorderBody",
  setup() {
    const mainstore = mainStore();
    const userstore = userStore();
    const { user } = storeToRefs(userstore);
    const userWithoutOrders = ref({}) as Ref<userDTO>;
    const router = useRouter();

    async function getUserOrders() {
      try {
        // console.log((await userstore.getuserInfoAndOrders(1)).data);

        user.value = (await userstore.getuserInfoAndOrders(1)).data;
        if (user.value) {
          const { orders, ...restOfuser } = user.value as userDTO;
          userWithoutOrders.value = restOfuser;
          orders?.forEach((order) => {
            mainstore.getOrderSingleProductTotalPrice(order.order_products);
          });
        }
      } catch (err: any) {
        console.log(err);
      }
    }
    // Load userinfo and orders
    const initLoadData = getUserOrders();

    return { initLoadData, userWithoutOrders, user, mainstore, getUserOrders };
  }
});
</script>

<style scoped></style>
