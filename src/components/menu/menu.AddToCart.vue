<template>
  <div
    v-if="dialogVis === true"
    class="addToCartFooter"
  >
    <el-input-number
      v-model="singleProductTempData.shoppingProduct_qty"
      :min="1"
      :max="10"
      name="selector"
    />
    <el-button
      size="large"
      @click="addToCart"
    >
      <template #icon>
        <el-icon size="24px">
          <ShoppingCart />
        </el-icon>
      </template>
      <div>
        <span v-if="!isModifyMode">
          <span
            >Add {{ singleProductTempData.shoppingProduct_qty }} to cart</span
          >
        </span>
        <span v-else>
          <span v-if="singleProductTempData.shoppingProduct_qty <= 1"
            >Update {{ singleProductTempData.shoppingProduct_qty }} item</span
          >
          <span v-else>
            Update {{ singleProductTempData.shoppingProduct_qty }} items
          </span>
        </span>
        <span>NT$ {{ singleProductTempData.shoppingProduct_finalPrice }}</span>
      </div>
      <!-- <el-row>
                    <el-col :span="16">Add 1 to cart</el-col>
                    <el-col :span="8">NT${{ singleProductTempData.product_price }}</el-col>
                </el-row>-->
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from "vue";
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
import { ShoppingCart } from "@element-plus/icons-vue";
import { cartdataDTO } from "../interfaces/cartDataDTO";
import { Iadjitem, IshoppingProduct } from "@/interface/menuDataInterface";

export default defineComponent({
  name: "Menuaddtocart",
  components: { ShoppingCart },
  setup() {
    const pinia = usepinia();
    const {
      singleProductTempData,
      clickedProductId,
      clickedProductCategoryId,
      cartData,
      checkbox,
      dialogVis,
      isModifyMode
    } = storeToRefs(pinia);
    function addToCart() {
      // const payload: Ref<cartdataDTO> = ref({
      //   product_id: singleProductTempData.value.product_id,
      //   order_product_quantity: singleProductTempData.value.shoppingProduct_qty,
      //   adjustitems: checkbox.value
      // });
      // postCartData(payload);
      // singleProductTempData.value.shoppingProduct_finalPrice =
      //   tempFinalPrice.value;
      function adjustitemsSort(a: Iadjitem, b: Iadjitem) {
        if (a.adjustitem_id < b.adjustitem_id) {
          return -1;
        }
        if (a.adjustitem_id > b.adjustitem_id) {
          return 1;
        }
        return 0;
      }

      singleProductTempData.value.shoppingProduct_adjustitems.sort(
        adjustitemsSort
      );
      cartData.value.push(singleProductTempData.value);
      singleProductTempData.value = {} as IshoppingProduct;
      checkbox.value = [];
      clickedProductId.value = NaN;
      clickedProductCategoryId.value = NaN;
      dialogVis.value = false;
    }

    watch(
      () => [
        singleProductTempData.value.shoppingProduct_finalPrice,
        singleProductTempData.value.shoppingProduct_qty
      ],
      () => {
        singleProductTempData.value.shoppingProduct_finalPrice =
          pinia.singleProductFinalPrice;
      }
    );

    async function postCartData(payload: Ref<cartdataDTO>) {
      try {
        await pinia.postMenuCartData(payload);
      } catch (e: unknown) {
        console.log(e);
      }
    }

    return {
      dialogVis,
      ShoppingCart,
      singleProductTempData,
      isModifyMode,
      addToCart,
      postCartData
    };
  }
});
</script>

<style scoped>
.addToCartFooter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: limegreen;
  width: 1re;
  /* padding-left: 10%;
  padding-right: 10%; */
}
.el-input-number {
  background: sandybrown;
}
.el-button {
  /* background: silver; */
}
</style>
