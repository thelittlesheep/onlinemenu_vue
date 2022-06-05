<template>
  <el-dialog
    v-model="dialogVis"
    :width="dialogWidth"
    :fullscreen="isDialogFullScreen"
    :lock-scroll="false"
    :destroy-on-close="true"
    :before-close="beforeDialogClose"
  >
    <div v-if="mainstore.getClickedTempCategoryData">
      <el-image
        :src="mainstore.getClickedTempProductData.product_image"
        fit="contain"
      />
      <div style="padding-left: 3%; padding-right: 3%">
        <h2>{{ mainstore.getClickedTempProductData.product_name }}</h2>
      </div>
      <div
        v-for="(types, index) in mainstore.getClickedTempCategoryData
          .adjusttypes"
        :key="index"
      >
        <el-collapse
          v-if="types.adjustitems?.length"
          v-model="activateCollapseItem"
        >
          <el-collapse-item
            :name="index"
            accordion="false"
          >
            <template #title>
              <div style="padding: 3%">
                <h5>{{ types.adjusttype_name }}</h5>
              </div>
            </template>
            <Menucheckboxgroup :propf-adjust-types-data="types" />
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <template #footer>
      <Menuaddtocart />
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { mainStore } from '@/store/main.store';
import { storeToRefs } from 'pinia';
import { defineComponent, ref, watch } from 'vue';
import Menucheckboxgroup from './menu.AdjustItemCheckBox.vue';
import { IshoppingProduct } from '@/interface/menuData.Interface';

export default defineComponent({
  name: 'Menuproductpopout',
  components: { Menucheckboxgroup },
  setup() {
    const mainstore = mainStore();
    const {
      menudatas,
      dialogVis,
      shoppingProduct,
      checkbox,
      clickedCartItemId,
      isModifyMode,
      clickedProductId,
      clickedProductCategoryId
    } = storeToRefs(mainstore);
    const isDialogFullScreen = ref(false);

    // 用於控制 el-collapse 之預設開啟選項，此為預設全開
    const activateCollapseItem = ref([0, 1, 2]);

    watch(
      () => checkbox.value,
      (afterVal) => {
        // 重置 shoppingProduct_adjustitems
        // shoppingProduct_afterAdjustSinglePrice ,
        // shoppingProduct_finalPrice 為預設值
        shoppingProduct.value.shoppingProduct_adjustitems = [];
        shoppingProduct.value.shoppingProduct_afterAdjustSinglePrice =
          shoppingProduct.value.product_price;
        shoppingProduct.value.shoppingProduct_finalPrice =
          mainstore.singleProductFinalPrice;
        mainstore.modifyshoppingProductadjustitems(afterVal);
      }
    );

    const beforeDialogClose = (done: () => void) => {
      done();
      shoppingProduct.value = {} as IshoppingProduct;
      clickedCartItemId.value = '';
      checkbox.value = [];
      isModifyMode.value = false;
      clickedProductId.value = NaN;
      clickedProductCategoryId.value = NaN;
    };

    let dialogWidth = '600px';
    function dialogResize() {
      const dialog = document.getElementsByClassName(
        'el-dialog'
      )[0] as HTMLElement;

      let windowSize = document.body.clientWidth;
      const defaultWidth = 600; // 預設寬度
      if (windowSize < defaultWidth) {
        isDialogFullScreen.value = true;
        dialogWidth = '100%';
        if (dialog) {
          dialog.style.width = dialogWidth;
        }
      } else {
        isDialogFullScreen.value = false;
        if (dialog) {
          dialog.style.width = defaultWidth + 'px';
        }
      }
    }
    dialogResize();
    window.addEventListener('resize', dialogResize);
    window.addEventListener('orientationchange', dialogResize);

    return {
      isDialogFullScreen,
      dialogWidth,
      shoppingProduct,
      activateCollapseItem,
      menudatas,
      mainstore,
      dialogVis,
      beforeDialogClose
    };
  }
});
</script>

<style scpoed>
div.el-collapse {
  border-top: 0;
  border-bottom: 0;
}
div.el-collapse-item__header {
  border-bottom: 0;
}
.el-collapse-item {
  font-size: 30px;
}

.el-dialog .el-dialog__body {
  padding: 0;
}

.el-dialog .el-dialog__footer {
  padding-top: 10px;
  width: 100%;
  justify-content: center;
  display: flex;

  /* border: 5px solid #ffff00; */
  /* background-color: #99a9bf; */
}

.el-collapse-item__content {
  padding-bottom: 10px;
}

.el-checkbox.el-checkbox--default {
  width: 100%;
  /* background-color: blue; */
}

.el-checkbox__label {
  width: 100%;
  /* background-color: aquamarine; */
}

#item {
  /* background-color: yellow; */
}

#price {
  /* background-color: plum; */
  align-content: end;
}
</style>
