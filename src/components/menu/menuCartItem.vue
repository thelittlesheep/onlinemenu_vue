<template>
  <div
    v-for="(item, index) in cartData"
    :key="index"
    class="cartItem"
    @click="clickItem(item.itemCartId)"
  >
    {{ item.product_name }}
    <div
      v-for="(adjitem, index2) in item.adjustitems"
      :key="index2"
    >
      {{ adjitem.adjustitem_name }}
    </div>
    <span>NT$ {{ item.finalPrice }}</span
    ><br />
    <el-select
      v-model="item.qty"
      @change="selectchange(item.itemCartId)"
    >
      <el-option
        v-for="opt in options"
        :key="opt.value"
        :label="opt.label"
        :value="opt.value"
      />
    </el-select>
    <el-divider />
  </div>
</template>

<script lang="ts">
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
import { defineComponent, ref, Ref } from "vue";
import { IshoppingProduct } from "./menuData/menuDataInterface";

export default defineComponent({
  name: "Menucartitem",
  setup() {
    const pinia = usepinia();
    const {
      cartData,
      dialogVis,
      clickedCartItemId,
      singleProductTempData,
      checkbox
    } = storeToRefs(pinia);
    // const value = ref();
    const arr = [...Array(10).keys()];
    const options: any = [];
    arr.forEach((i) => {
      options.push({ value: i, label: String(i) });
    });

    function selectchange(itemCartId: string) {
      const selectItem = ref(
        pinia.getSingleCartItem(itemCartId)
      ) as Ref<IshoppingProduct>;
      // console.log(value);

      if (selectItem.value.qty !== 0) {
        selectItem.value.finalPrice =
          selectItem.value.afterAdjustSinglePrice * selectItem.value.qty;
      } else {
        const itemIndex = pinia.getSingleCartItemArrayIndex(itemCartId);
        cartData.value.splice(itemIndex, 1);
      }
    }

    function clickItem(itemCartId: string) {
      clickedCartItemId.value = itemCartId;
      singleProductTempData.value = pinia.getSingleCartItem(itemCartId);
      singleProductTempData.value.adjustitems?.forEach((adjitem) => {
        checkbox.value.push(adjitem.adjustitem_id);
      });
      dialogVis.value = true;
      // console.log(itemCartId);
    }

    return { options, cartData, dialogVis, selectchange, clickItem };
  }
});
</script>

<style scoped>
/* .el-select.quantitySelect {
  background: goldenrod;
} */
</style>
