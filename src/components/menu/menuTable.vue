<template>
  <el-dialog
    v-model="dialogVis"
    width="600px"
    :destroy-on-close="true"
    :before-close="beforeDialogClose"
  >
    <Menuprodpop />
    <template #footer>
      <Addtocart />
    </template>
  </el-dialog>

  <div class="container p-3">
    <el-row
      v-for="(data, index) in menudatas"
      :key="index"
      :gutter="20"
    >
      <el-col>
        <h2>{{ data.category_name }}</h2>
      </el-col>
      <el-col
        v-for="(prod, index2) in data.products"
        :key="index2"
        :span="6"
      >
        <el-card
          :id="prod.product_id"
          shadow="hover"
          name="productcard"
          @click="cardClickHandler(prod.product_id, data.category_id)"
        >
          <el-image
            style="width: 100%; height: 200px padding:1%"
            :src="prod.product_image"
            fit="contain"
          />
          <div
            class="prodname"
            style="padding: 3px"
          >
            <span>{{ prod.product_name }}</span>
          </div>
          <div
            class="prodprice"
            style="padding: 3px"
          >
            <span>$ {{ prod.product_price }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import Menuprodpop from "./menuProductPopout.vue";
import Addtocart from "./menuAddToCart.vue";
import { IshoppingProduct } from "./menuData/menuDataInterface";

export default defineComponent({
  name: "Menutable",
  components: { Menuprodpop, Addtocart },
  // watch: {
  //   dialogVisible(visible) {
  //     if (visible) {
  //       console.log(visible);

  //       // Here you would put something to happen when dialog opens up
  //       console.log("Dialog was opened!");
  //     } else {
  //       console.log(visible);

  //       console.log("Dialog was closed!");
  //     }
  //   },
  // },
  setup() {
    const pinia = usepinia();
    const {
      menudatas,
      dialogVis,
      singleProductTempData,
      clickedCartItemId,
      clickedProductId,
      clickedProductCategoryId,
      checkbox,
      isModifyMode
    } = storeToRefs(pinia);

    const dialogVisible = dialogVis;
    function cardClickHandler(productid: number, categoryid: number) {
      clickedProductId.value = productid;
      clickedProductCategoryId.value = categoryid;
      dialogVisible.value = true;
    }
    const beforeDialogClose = (done: () => void) => {
      done();
      singleProductTempData.value = {} as IshoppingProduct;
      clickedCartItemId.value = "";
      checkbox.value = [];
      isModifyMode.value = false;
      clickedProductId.value = NaN;
      clickedProductCategoryId.value = NaN;
    };

    return {
      menudatas,
      dialogVis,
      dialogVisible,
      cardClickHandler,
      beforeDialogClose
    };
  }
});
</script>
<style scoped>
.el-row {
  margin-bottom: 1%;
}
/* .el-row:last-child {
  background-color: antiquewhite;
  margin-bottom: 0;
} */
.el-col {
  margin-top: 1%;
}
.el-card {
  border: 0px;
}
</style>
