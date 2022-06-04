<template>
  <div class="addToCartFooter">
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
      <div class="addToCartButtonContent">
        <el-icon :size="24">
          <ShoppingCart />
        </el-icon>
        <span v-if="!isModifyMode">
          <span>加入至購物車</span>
        </span>
        <span v-else>
          <span>更新至購物車</span>
        </span>
        <!-- <span>NT$ {{ shoppingProduct.shoppingProduct_finalPrice }}</span> -->
      </div>
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';
import { mainStore } from '@/store/main.store';
import { storeToRefs } from 'pinia';
import { ShoppingCart } from '@element-plus/icons-vue';
import { orderDTO } from '@/interface/orderDTO';
import { Iadjitem, IshoppingProduct } from '@/interface/menuData.Interface';

export default defineComponent({
  name: 'Menuaddtocart',
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
      const isInCart =
        cartData.value.findIndex((item) => {
          return (
            item.shoppingProduct_uuid ===
            shoppingProduct.value.shoppingProduct_uuid
          );
        }) !== -1
          ? true
          : false;
      isInCart ? null : cartData.value.push(shoppingProduct.value);
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

    return {
      dialogVis,
      ShoppingCart,
      shoppingProduct,
      isModifyMode,
      addToCart
    };
  }
});
</script>

<style scoped>
.addToCartFooter {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  /* background: limegreen; */
  /* padding-left: 10%;
  padding-right: 10%; */
}
.el-input-number {
  /* border: 1;
  max-width: 100%; */
  /* margin-right: 1rem; */
  /* background: sandybrown; */
}
.addToCartButtonContent {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
