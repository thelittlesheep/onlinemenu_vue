<template>
  <div class="myorderSingleOrderDetail">
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
          <div class="userOrderDetail">
            <span
              >訂購時間：{{
                mainstore.displayLocalDateTime(
                  onClickOrderRestof.order_orderdate
                )
              }}</span
            >
            <span
              >取餐時間：{{
                mainstore.displayLocalDateTime(
                  onClickOrderRestof.order_pickupdate
                )
              }}</span
            >
          </div>
          <div
            v-for="product in onClickOrderProducts"
            :key="product.order_product_id"
            class="userOrderProduct"
          >
            <el-card>
              <h4>{{ product.product_name }}</h4>
              <span>數量：{{ product.order_product_quantity }}</span>
              <span>金額：{{ product.order_product_finalprice }}</span>
              <div v-if="product.order_product_adjustitem">
                <ol>
                  <li
                    v-for="adjitem in product.order_product_adjustitem"
                    :key="adjitem.adjustitem_id"
                  >
                    {{ adjitem.adjustitem_name }}
                  </li>
                </ol>
              </div>
              <div v-else>
                <span>無調整項目</span>
              </div>
            </el-card>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script lang="ts">
import { Iorderproduct, orderDTO } from '@/interface/orderDTO';
import { mainStore } from '@/store/main.store';
import { userStore } from '@/store/user.store';
import { storeToRefs } from 'pinia';
import { defineComponent, PropType, Ref, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

export default defineComponent({
  /* eslint-disable vue/require-default-prop */
  name: 'MyorderSingleOrderDetail',
  setup() {
    const mainstore = mainStore();
    const userstore = userStore();
    const { user, userInfo } = storeToRefs(userstore);

    const route = useRoute();
    const onClickOrderProducts = ref([]) as Ref<Array<Iorderproduct>>;
    const onClickOrderRestof = ref({}) as Ref<orderDTO>;
    const isLoading = ref(true);
    async function getUserSingleOrder() {
      isLoading.value = true;
      if (user.value) {
        const { order_products, ...restoforder } =
          (user.value.orders?.find((order) => {
            return order.order_id === Number(route.params.orderid);
          }) as orderDTO) ?? {};
        onClickOrderRestof.value = restoforder;
        onClickOrderProducts.value = order_products ?? [];
      }
      mainstore.getOrderSingleProductTotalPrice(onClickOrderProducts.value);
      isLoading.value = false;
    }
    getUserSingleOrder();
    const defaultWidth = 500;
    let skeletonWidth = defaultWidth + 'px';
    let skeletonWidthStyle = 'width:' + skeletonWidth;
    function drawerResize() {
      const skeleton = document.getElementsByClassName(
        'skeleton'
      )[0] as HTMLElement;
      let windowSize = document.body.clientWidth;
      // 預設寬度
      if (windowSize < defaultWidth) {
        skeletonWidth = '100%';
        skeletonWidthStyle = 'width:' + skeletonWidth;
        if (skeleton) {
          skeleton.style.width = skeletonWidth;
        }
      } else {
        if (skeleton) {
          skeleton.style.width = defaultWidth + 'px';
        }
      }
    }
    drawerResize();
    window.addEventListener('resize', drawerResize);
    window.addEventListener('orientationchange', drawerResize);
    return {
      onClickOrderProducts,
      onClickOrderRestof,
      userInfo,
      mainstore,
      isLoading,
      skeletonWidthStyle
    };
  }
});
</script>

<style scoped>
.myorderSingleOrderDetail {
  display: flex;

  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}
span {
  display: block;
}
.skeleton {
  display: flex;

  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
}

.userOrderProduct {
  display: flex;

  flex-direction: row;
  justify-content: center;
}
.el-card {
  width: 100%;
  height: 100%;
}
</style>
