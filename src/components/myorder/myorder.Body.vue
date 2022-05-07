<template>
  <el-button
    type="primary"
    @click="getUserOrders()"
  >
    Fetch Data
  </el-button>

  <h1>您的訂單</h1>
  <div v-if="isPresentOrder">
    <h4>尚未取餐的訂單</h4>
    <div
      v-for="(data, index) in presentOrder"
      :key="index"
      class="userordersdata"
    >
      <el-card>
        <span class="order_order_id"
          >訂單編號：{{ data.order_id }}
          <el-button
            type="text"
            @click="deleteUserOrder(data.order_id)"
            >取消訂單</el-button
          ></span
        ><br />
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
  <br />
  <div v-if="isHistoryOrder">
    <h4>過去的訂單</h4>
    <div
      v-for="(data, index) in historyOrder"
      :key="index"
      class="userordersdata"
    >
      <el-card>
        <span class="order_order_id">訂單編號：{{ data.order_id }} </span><br />
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
  <div v-if="!isHistoryOrder && !isPresentOrder">
    <h2>目前尚無任何訂單</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";

import { userStore } from "@/store/user.store";
import { storeToRefs } from "pinia";
import { userDTO } from "@/interface/userDTO";
import { mainStore } from "@/store/main.store";
import { useRouter } from "vue-router";
import { orderDTO } from "@/interface/orderDTO";
import moment from "moment";
import "moment/dist/locale/zh-tw";

import { Delete } from "@element-plus/icons-vue";

export default defineComponent({
  name: "MyorderBody",
  setup() {
    const mainstore = mainStore();
    const userstore = userStore();
    const { user } = storeToRefs(userstore);
    const userWithoutOrders = ref({}) as Ref<userDTO>;
    const router = useRouter();
    const isHistoryOrder = ref(false);
    const isPresentOrder = ref(false);
    const historyOrder = ref([]) as Ref<Array<orderDTO>>;
    const presentOrder = ref([]) as Ref<Array<orderDTO>>;

    async function deleteUserOrder(order_id: number) {
      try {
        await userstore.deleteUserSingleOrder(order_id);
      } catch (e) {
        console.log(e);
      }
    }

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

    return {
      initLoadData,
      userWithoutOrders,
      user,
      mainstore,
      getUserOrders,
      deleteUserOrder,
      historyOrder,
      presentOrder,
      isHistoryOrder,
      isPresentOrder,
      Delete
    };
  }
});
</script>

<style scoped></style>
