<template>
  <div>
    <h4>
      <span v-if="props.ordersType === 'PresentOrder'">尚未取餐的訂單</span>
      <span v-else>已取餐的訂單</span>
    </h4>
  </div>
  <div
    v-for="(data, index) in props.orders"
    :key="index"
    class="userordersdata"
  >
    <el-card
      class="order_card"
      @click="openOrderDetail(data.order_id)"
    >
      <div>
        <span class="order_order_id">
          訂單編號：{{ data.order_id }}
          <el-button
            v-if="props.ordersType === 'PresentOrder'"
            type="text"
            @click.stop="deleteUserOrder(data.order_id)"
            >取消訂單</el-button
          >
        </span>
        <span class="order_orderdate"
          >訂購時間：
          {{ mainstore.displayLocalDateTime(data.order_orderdate) }}</span
        >
        <span class="order_pickupdate"
          >取餐時間：
          {{ mainstore.displayLocalDateTime(data.order_pickupdate) }}</span
        ><br />
        <span class="order_order_productlen">
          {{ data.order_products?.length }} 份餐點
        </span>
        <span class="order_order_totalprice">
          總金額：{{ mainstore.getOrderTotalPrice(data.order_products) }} 元
        </span>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, h, PropType, watch } from "vue";
import { orderDTO } from "@/interface/orderDTO";
import { mainStore } from "@/store/main.store";
import { userStore } from "@/store/user.store";
import { storeToRefs } from "pinia";
import { ElMessage, ElMessageBox } from "element-plus";
import { RWDElMessageBox } from "@/util/ElMessageBox.RWD";
import { useRouter } from "vue-router";

export default defineComponent({
  /* eslint-disable vue/require-default-prop */
  name: "MyorderSingleOrder",
  props: {
    orders: { type: Array as PropType<Array<orderDTO>> },
    ordersType: { type: String }
  },
  emits: ["ondeleteuserorder"],
  setup(props, { emit }) {
    const mainstore = mainStore();
    const userstore = userStore();
    const router = useRouter();
    // const msgBOX = document.getElementsByClassName(
    //   "el-message-box"
    // )[0] as HTMLElement;

    async function deleteUserOrder(order_id: number) {
      ElMessageBox.confirm("確定要取消此訂單?", {
        type: "info",
        cancelButtonText: "讓我再想想",
        customClass: "deleteUserOrder-confirm",
        showClose: false
      })
        .then(async () => {
          try {
            const res = await userstore.deleteUserSingleOrder(order_id);
            if (res.data.status === 200) {
              ElMessage({
                type: "success",
                message: `訂單:${order_id} 成功刪除`
              });
              emit("ondeleteuserorder");
            } else {
              ElMessage({
                type: "error",
                message: h("div", null, [
                  h("span", null, `訂單：${order_id} 刪除失敗`),
                  h("br"),
                  h("span", null, `原因：${res.data.message}`)
                ])
              });
            }
          } catch (e) {
            console.log(e);
          }
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "操作取消"
          });
        });
      RWDElMessageBox();
      // let dialogWidth;
      // let windowSize = document.body.clientWidth;
      // const defaultWidth = 450; // 預設寬度
      // if (windowSize < defaultWidth) {
      //   dialogWidth = "80%";
      //   if (msgBOX) {
      //     msgBOX.style.width = dialogWidth;
      //   }
      // } else {
      //   dialogWidth = defaultWidth + "px";
      // }
    }
    function openOrderDetail(order_id: number) {
      router.push("/myorder/" + order_id);
    }
    // watch(
    //   () => msgBOX,
    //   (newVal, oldVal) => {
    //     console.log(newVal, oldVal);
    //   }
    // );
    return { props, mainstore, deleteUserOrder, openOrderDetail };
  }
});
</script>

<style scoped>
:deep() .deleteUserOrder-confirm {
  background-color: aquamarine;
}

:deep() span {
  display: block;
}
</style>
