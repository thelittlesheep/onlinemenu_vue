<template>
  <div
    v-for="(item, index) in cartData"
    :key="index"
    class="cartItem"
    @click="clickItem(item.shoppingProduct_uuid)"
  >
    <div class="itemContent">
      <div class="itemText">
        <span>
          <h3>
            {{ item.product_name }}
          </h3>
        </span>
        <ul
          v-for="(adjitem, index2) in item.shoppingProduct_adjustitems"
          :key="index2"
        >
          <li>
            <span>{{ adjitem.adjustitem_name }}</span>
            <span v-if="adjitem.adjustitem_priceadjust > 0">
              (+${{ adjitem.adjustitem_priceadjust }})</span
            >
            <span v-else-if="adjitem.adjustitem_priceadjust < 0">
              (-${{ adjitem.adjustitem_priceadjust }})
            </span>
          </li>
        </ul>
        <span>NT$ {{ item.shoppingProduct_finalPrice }}</span>
        <el-select
          v-model="item.shoppingProduct_qty"
          @change="selectchange(item.shoppingProduct_uuid)"
        >
          <el-option
            v-for="opt in options"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
      </div>
      <el-image
        :src="item.product_image"
        fit="scale-down"
        class="itemImg"
      />
    </div>
    <el-divider />
  </div>
</template>

<script lang="ts">
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
import { defineComponent, ref, Ref } from "vue";
import { IshoppingProduct } from "@/interface/menuDataInterface";

export default defineComponent({
  name: "Menucartitem",
  setup() {
    const pinia = usepinia();
    const {
      cartData,
      dialogVis,
      clickedCartItemId,
      singleProductTempData,
      checkbox,
      clickedProductId,
      clickedProductCategoryId
    } = storeToRefs(pinia);
    // const value = ref();
    const arr = [...Array(11).keys()];
    const options: any = [];
    arr.forEach((i) => {
      options.push({ value: i, label: String(i) });
    });

    function selectchange(shoppingProduct_id: string) {
      const selectItem = ref(
        pinia.getSingleCartItem(shoppingProduct_id)
      ) as Ref<IshoppingProduct>;
      // console.log(value);

      if (selectItem.value.shoppingProduct_qty !== 0) {
        selectItem.value.shoppingProduct_finalPrice =
          selectItem.value.shoppingProduct_afterAdjustSinglePrice *
          selectItem.value.shoppingProduct_qty;
      } else {
        const itemIndex = pinia.getSingleCartItemArrayIndex(shoppingProduct_id);
        cartData.value.splice(itemIndex, 1);
      }
    }

    function clickItem(shoppingProduct_id: string) {
      clickedCartItemId.value = shoppingProduct_id;
      singleProductTempData.value = pinia.getSingleCartItem(shoppingProduct_id);
      singleProductTempData.value.shoppingProduct_adjustitems?.forEach(
        (adjitem) => {
          checkbox.value.push(adjitem.adjustitem_id);
        }
      );
      clickedProductId.value = singleProductTempData.value.product_id;
      clickedProductCategoryId.value = singleProductTempData.value
        .category_id as number;
      console.log(pinia.getClickedTempCategoryData);
      console.log(shoppingProduct_id);

      dialogVis.value = true;
    }

    return { options, cartData, dialogVis, selectchange, clickItem };
  }
});
</script>

<style scoped>
.cartItem {
  /* background-color: firebrick; */
  /* width: 100%; */
  /* display: flex;
  align-items: flex-start; */
  flex-direction: column;
}
.cartItem .itemContent {
  /* background-color: aqua; */
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.cartItem .itemText {
  /* background: aquamarine; */
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  align-self: stretch;
  justify-content: space-between;
}
.cartItem .itemImg {
  width: 30%;
  display: flex;
  align-self: center;
  /* margin-left: auto; */
}
.cartItem .el-divider {
  background: sandybrown;
}
</style>
