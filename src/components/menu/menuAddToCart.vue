<template>
  <el-row
    :gutter="50"
    align="middle"
  >
    <el-col :span="8">
      <el-input-number
        v-model="singleProductTempData.shoppingProduct_qty"
        :min="1"
        :max="10"
        name="selector"
      />
    </el-col>
    <el-col
      :span="16"
      name="button"
    >
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
          <span
            >NT$ {{ singleProductTempData.shoppingProduct_finalPrice }}</span
          >
        </div>
        <!-- <el-row>
                    <el-col :span="16">Add 1 to cart</el-col>
                    <el-col :span="8">NT${{ singleProductTempData.product_price }}</el-col>
                </el-row>-->
      </el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from "vue";
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
import { ShoppingCart } from "@element-plus/icons-vue";
import { cartdataDTO } from "../interfaces/cartDataDTO";
import { IshoppingProduct } from "./menuData/menuDataInterface";

export default defineComponent({
  name: "Addtocart",
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
      if (!isModifyMode.value) {
        cartData.value.push(singleProductTempData.value);
      }
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
/* .el-button span {
    display: inline-block;
    width: 100px;
    background-color: aqua;
}
.el-button span .el-row {
    align-content: center;
    display: inline-block;
    width: 25vw;
    background: violet;
}
.el-button span div.el-row div.el-col {
    background: sandybrown;
} */
.el-button span {
  display: inline-block;
  width: 80%;
  /* background: aquamarine; */
}
.el-button {
  /* background-color: wheat; */
  /* padding: 0; */
  width: 100%;
}
.el-row {
  width: 100%;
  padding-top: 2%;
  /* border: 5px solid #ffff00; */
  /* background-color: firebrick; */
}
</style>
