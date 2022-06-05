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
import { mainStore } from '@/store/main.store';
import { storeToRefs } from 'pinia';
import { defineComponent, ref, Ref } from 'vue';
import { IshoppingProduct } from '@/interface/menuData.Interface';

export default defineComponent({
  name: 'Menucartitem',
  setup() {
    const mainstore = mainStore();
    const {
      cartData,
      dialogVis,
      isModifyMode,
      clickedCartItemId,
      shoppingProduct,
      checkbox,
      clickedProductId,
      clickedProductCategoryId
    } = storeToRefs(mainstore);
    // const value = ref();
    const arr = [...Array(11).keys()];
    const options: any = [];
    arr.forEach((i) => {
      options.push({ value: i, label: String(i) });
    });

    function selectchange(shoppingProduct_id: string) {
      const selectItem = ref(
        mainstore.getSingleCartItem(shoppingProduct_id)
      ) as Ref<IshoppingProduct>;
      // console.log(value);

      if (selectItem.value.shoppingProduct_qty !== 0) {
        selectItem.value.shoppingProduct_finalPrice =
          selectItem.value.shoppingProduct_afterAdjustSinglePrice *
          selectItem.value.shoppingProduct_qty;
      } else {
        const itemIndex =
          mainstore.getSingleCartItemArrayIndex(shoppingProduct_id);
        console.log(itemIndex);

        cartData.value.splice(itemIndex, 1);
      }
    }

    function clickItem(shoppingProduct_id: string) {
      clickedCartItemId.value = shoppingProduct_id;
      shoppingProduct.value = mainstore.getSingleCartItem(shoppingProduct_id);
      checkbox.value = mainstore.adjustitemsTocheckbox;
      clickedProductId.value = shoppingProduct.value.product_id;
      clickedProductCategoryId.value = shoppingProduct.value.category_id;
      // 控制dialog的開啟與關閉與是否正在修改模式
      isModifyMode.value = true;
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
