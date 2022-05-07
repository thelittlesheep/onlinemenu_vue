<template>
  <div
    v-if="dialogVis === true"
    class="addToCartFooter"
  >
    <el-input-number
      v-model="shoppingProduct.shoppingProduct_qty"
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
          <span>Add {{ shoppingProduct.shoppingProduct_qty }} to cart</span>
        </span>
        <span v-else>
          <span
            >Update {{ shoppingProduct.shoppingProduct_qty }}
            <span v-if="shoppingProduct.shoppingProduct_qty <= 1">item</span>
            <span v-else> items </span>
          </span>
        </span>
        <span>NT$ {{ shoppingProduct.shoppingProduct_finalPrice }}</span>
      </div>
      <!-- <el-row>
                    <el-col :span="16">Add 1 to cart</el-col>
                    <el-col :span="8">NT${{ shoppingProduct.product_price }}</el-col>
                </el-row>-->
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from "vue";
import { mainStore } from "@/store/main.store";
import { storeToRefs } from "pinia";
import { ShoppingCart } from "@element-plus/icons-vue";
import { orderDTO } from "@/interface/orderDTO";
import { Iadjitem, IshoppingProduct } from "@/interface/menuData.Interface";

export default defineComponent({
  name: "Menuaddtocart",
  components: { ShoppingCart },
  setup() {
    const mainstore = mainStore();
    const {
      shoppingProduct,
      clickedProductId,
      clickedProductCategoryId,
      cartData,
      checkbox,
      dialogVis,
      isModifyMode
    } = storeToRefs(mainstore);
    function addToCart() {
      cartData.value.push(shoppingProduct.value);
      shoppingProduct.value = {} as IshoppingProduct;
      checkbox.value = [];
      clickedProductId.value = NaN;
      clickedProductCategoryId.value = NaN;
      dialogVis.value = false;
    }

    watch(
      () => [
        shoppingProduct.value.shoppingProduct_finalPrice,
        shoppingProduct.value.shoppingProduct_qty
      ],
      () => {
        shoppingProduct.value.shoppingProduct_finalPrice =
          mainstore.singleProductFinalPrice;
      }
    );

    async function postCartData(payload: Ref<orderDTO>) {
      try {
        await mainstore.postMenuCartData(payload);
      } catch (e: unknown) {
        console.log(e);
      }
    }

    return {
      dialogVis,
      ShoppingCart,
      shoppingProduct,
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
  /* background: limegreen; */
  width: 1re;
  /* padding-left: 10%;
  padding-right: 10%; */
}
.el-input-number {
  border: 0;
  margin-right: 1rem;
  /* background: sandybrown; */
}
.el-button {
  /* background: silver; */
}
</style>
