<template>
  <div>
    <h1>
      您的訂單
      <el-button
        type="text"
        @click="getUserOrders()"
      >
        重新整理
      </el-button>
    </h1>
  </div>
  <div v-if="isPresentOrder">
    <h4>尚未取餐的訂單</h4>
    <MyorderSingleOrder
      :orders="presentOrder"
      :orders-type="'PresentOrder'"
      @ondeleteuserorder="getUserOrders()"
    />
  </div>
  <br />
  <div v-if="isHistoryOrder">
    <h4>過去的訂單</h4>
    <MyorderSingleOrder
      :orders="historyOrder"
      :orders-type="'HistoryOrder'"
    />
  </div>
  <div v-if="!isHistoryOrder && !isPresentOrder">
    <h2>目前尚無任何訂單</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import MyorderSingleOrder from "./myorder.SingleOrder.vue";

import { userStore } from "@/store/user.store";
import { storeToRefs } from "pinia";
import { userDTO } from "@/interface/userDTO";
import { mainStore } from "@/store/main.store";
import { orderDTO } from "@/interface/orderDTO";
import moment from "moment";
import "moment/dist/locale/zh-tw";

export default defineComponent({
  name: "MyorderBody",
  components: { MyorderSingleOrder },
  setup() {
    const mainstore = mainStore();
    const userstore = userStore();
    const { user } = storeToRefs(userstore);
    const userWithoutOrders = ref({}) as Ref<userDTO>;
    const isHistoryOrder = ref(false);
    const isPresentOrder = ref(false);
    const historyOrder = ref([]) as Ref<Array<orderDTO>>;
    const presentOrder = ref([]) as Ref<Array<orderDTO>>;

    async function getUserOrders() {
      try {
        user.value = (await userstore.getuserInfoAndOrders()).data;
        if (user.value) {
          const { orders, ...restOfuser } = user.value as userDTO;
          userWithoutOrders.value = restOfuser;
          orders?.forEach((order) => {
            mainstore.getOrderSingleProductTotalPrice(order.order_products);
          });
          if (orders) {
            historyOrder.value = orders.filter(
              (order) => moment(order.order_pickupdate) <= moment()
            );
            presentOrder.value = orders.filter(
              (order) => moment(order.order_pickupdate) > moment()
            );
            historyOrder.value.length > 0
              ? (isHistoryOrder.value = true)
              : (isHistoryOrder.value = false);
            presentOrder.value.length > 0
              ? (isPresentOrder.value = true)
              : (isPresentOrder.value = false);
          }
        }
      } catch (err: any) {
        console.log(err);
      }
    }
    // Load userinfo and orders
    const initLoadData = getUserOrders();

    async function test() {
      console.log("test");
      await getUserOrders();
    }

    return {
      initLoadData,
      userWithoutOrders,
      user,
      mainstore,
      getUserOrders,
      historyOrder,
      presentOrder,
      isHistoryOrder,
      isPresentOrder,
      test
    };
  }
});
</script>

<style scoped></style>
