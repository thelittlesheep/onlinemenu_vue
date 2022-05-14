<template>
  <div class="myorderBody">
    <div class="myorderBodyHeader">
      <h2>您的訂單</h2>
      <el-button
        type="text"
        @click="getUserOrders()"
      >
        <el-icon :size="22">
          <Refresh />
        </el-icon>
      </el-button>
    </div>
    <div
      class="skeleton"
      :style="skeletonWidthStyle"
    >
      <el-skeleton
        :loading="isLoading"
        animated
      >
        <template #template>
          <el-skeleton-item
            variant="h1"
            style="width: 200px; height: 28px"
          />
          <el-card>
            <div
              style="
                display: flex;
                align-items: flex-start;
                flex-wrap: wrap;
                justify-content: space-between;
                flex-direction: column;
              "
            >
              <el-skeleton-item
                variant="h1"
                style="width: 60%; margin-bottom: 3%"
              />
              <el-skeleton-item
                variant="h1"
                style="width: 300px; margin-bottom: 3%"
              />
              <el-skeleton-item
                variant="h1"
                style="width: 300px; margin-bottom: 60px"
              />
              <el-skeleton-item
                variant="h1"
                style="width: 120px; margin-bottom: 3%"
              />
              <el-skeleton-item
                variant="h1"
                style="width: 200px"
              />
            </div>
          </el-card>
        </template>
        <template #default>
          <div class="orderList">
            <div
              v-if="isPresentOrder"
              class="Presentorder"
            >
              <MyorderSingleOrder
                :orders="presentOrder"
                :orders-type="'PresentOrder'"
                @ondeleteuserorder="getUserOrders()"
              />
            </div>
            <div
              v-if="isHistoryOrder"
              class="HistoryOrder"
            >
              <MyorderSingleOrder
                :orders="historyOrder"
                :orders-type="'HistoryOrder'"
              />
            </div>
            <div v-if="!isHistoryOrder && !isPresentOrder">
              <h2>目前尚無任何訂單</h2>
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import MyorderSingleOrder from "./myorder.SingleOrder.vue";
import { Refresh } from "@element-plus/icons-vue";

import { userStore } from "@/store/user.store";
import { storeToRefs } from "pinia";
import { userDTO } from "@/interface/userDTO";
import { mainStore } from "@/store/main.store";
import { orderDTO } from "@/interface/orderDTO";
import moment from "moment";
import "moment/dist/locale/zh-tw";

export default defineComponent({
  name: "MyorderBody",
  components: { MyorderSingleOrder, Refresh },
  setup() {
    const mainstore = mainStore();
    const userstore = userStore();
    const { user } = storeToRefs(userstore);
    const userWithoutOrders = ref({}) as Ref<userDTO>;
    const isHistoryOrder = ref(false);
    const isPresentOrder = ref(false);
    const historyOrder = ref([]) as Ref<Array<orderDTO>>;
    const presentOrder = ref([]) as Ref<Array<orderDTO>>;
    const isLoading = ref(true);

    async function getUserOrders() {
      isLoading.value = true;
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
            isLoading.value = false;
          }
        }
      } catch (err: any) {
        console.log(err);
      }
    }
    // Load userinfo and orders
    getUserOrders();

    const defaultWidth = 500;
    let skeletonWidth = defaultWidth + "px";
    let skeletonWidthStyle = "width:" + skeletonWidth;
    function drawerResize() {
      const skeleton = document.getElementsByClassName(
        "skeleton"
      )[0] as HTMLElement;
      let windowSize = document.body.clientWidth;
      // 預設寬度
      if (windowSize < defaultWidth) {
        skeletonWidth = "100%";
        skeletonWidthStyle = "width:" + skeletonWidth;
        if (skeleton) {
          skeleton.style.width = skeletonWidth;
        }
      } else {
        if (skeleton) {
          skeleton.style.width = defaultWidth + "px";
        }
      }
    }
    drawerResize();
    window.addEventListener("resize", drawerResize);
    window.addEventListener("orientationchange", drawerResize);

    return {
      userWithoutOrders,
      user,
      mainstore,
      getUserOrders,
      historyOrder,
      presentOrder,
      isHistoryOrder,
      isPresentOrder,
      isLoading,
      skeletonWidthStyle
    };
  }
});
</script>

<style scoped>
.myorderBody {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}
.myorderBodyHeader {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
.orderList {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}
.Presentorder {
  margin-bottom: 20px;
}
</style>
