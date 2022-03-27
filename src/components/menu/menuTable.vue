<template>
  <el-dialog v-model="dialogVisible" width="600px" :destroy-on-close="true">
    <Menuprodpop :prodid="onClickProdId" :categoryid="onClickCategoryId" />
    <template #footer>
      <Addtocart />
    </template>
  </el-dialog>

  <div class="container p-3">
    <el-row v-for="(data, index) in menudatas" :key="index" :gutter="20">
      <el-col>
        <h2>{{ data.category_name }}</h2>
      </el-col>
      <el-col v-for="(prod, index) in data.products" :key="index" :span="6">
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
          <div class="prodname" style="padding: 3px">
            <span>{{ prod.product_name }}</span>
          </div>
          <div class="prodprice" style="padding: 3px">
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
import { defineComponent, ref } from "vue";
import Menuprodpop from "./menuProductPopout.vue";
import Addtocart from "./menuData/menuAddToCart.vue";

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
    const { menudatas, dialogVis } = storeToRefs(pinia);

    const dialogVisible = dialogVis;
    const onClickProdId = ref(0);
    const onClickCategoryId = ref(0);
    function cardClickHandler(productid: number, categoryid: number) {
      onClickProdId.value = productid;
      onClickCategoryId.value = categoryid;
      dialogVisible.value = true;
    }

    return {
      menudatas,
      cardClickHandler,
      dialogVisible,
      onClickProdId,
      onClickCategoryId,
    };
  },
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
