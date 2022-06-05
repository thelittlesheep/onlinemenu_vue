<template>
  <div class="myorderBody">
    <div class="myorderBodyHeader">
      <h2>您的訂單</h2>
      <el-button
        type="text"
        @click="getUserOrders()"
      >
        <el-icon :size="24">
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
          <div
            class="skeleton-loading"
            :style="skeletonWidthStyle"
          >
            <el-skeleton-item
              variant="h1"
              style="width: 150px; height: 28px"
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
                  style="width: 80%; margin-bottom: 3%"
                />
                <el-skeleton-item
                  variant="h1"
                  style="width: 80%; margin-bottom: 30px"
                />
                <el-skeleton-item
                  variant="h1"
                  style="width: 60%; margin-bottom: 3%"
                />
                <el-skeleton-item
                  variant="h1"
                  style="width: 200px"
                />
              </div>
            </el-card>
          </div>
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
import { defineComponent, Ref, ref } from 'vue';
import MyorderSingleOrder from './myorder.SingleOrder.vue';
import { Refresh } from '@element-plus/icons-vue';
import { userStore } from '@/store/user.store';
import { storeToRefs } from 'pinia';
import { userDTO } from '@/interface/userDTO';
import { mainStore } from '@/store/main.store';
import { orderDTO } from '@/interface/orderDTO';
import moment from 'moment';
import 'moment/dist/locale/zh-tw';

export default defineComponent({
  name: 'MyorderBody',
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
          if (orders !== undefined) {
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
    // 配合小尺寸之iPhone，預設寬度要先設為低於螢幕寬度，
    // 若螢幕寬度超過寬度，則寬度設為更大
    let defaultWidth = 330;
    let windowSize = document.body.clientWidth;
    windowSize < defaultWidth ? (defaultWidth = 370) : null;

    let skeletonWidth = defaultWidth + 'px';
    let skeletonWidthStyle = 'width:' + skeletonWidth;
    function drawerResize() {
      const skeleton = document.getElementsByClassName(
        'el-skeleton is-animated'
      )[0] as HTMLElement;
      // 預設寬度
      if (windowSize < defaultWidth) {
        skeletonWidth = '100%';
        skeletonWidthStyle = 'width:' + skeletonWidth;
        if (skeleton) {
          // skeleton.style.width = skeletonWidth;
          skeleton.setAttribute('style', 'width:' + skeletonWidth);
        }
      } else {
        if (skeleton) {
          skeleton.style.width = 'inherit';
        }
      }
    }
    drawerResize();
    window.addEventListener('resize', drawerResize);
    window.addEventListener('orientationchange', drawerResize);

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
/* .skeleton {
  display: flex;
} */
:deep() .el-skeleton {
  display: flex;
  display: -webkit-flex;

  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
}
.myorderBody {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}
.myorderBodyHeader {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}
.myorderBodyHeader h2 {
  margin-bottom: 0;
  margin-right: 5px;
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
