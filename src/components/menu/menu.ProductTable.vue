<template>
  <div class="container">
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
        :span="8"
      >
        <el-card
          :id="prod.product_id"
          shadow="hover"
          class=""
          @click="cardClickHandler(prod.product_id, data.category_id)"
        >
          <div class="productcard">
            <div class="cardContent">
              <div
                class="prodname"
                style="padding: 3px"
              >
                <span
                  ><h4>{{ prod.product_name }}</h4></span
                >
              </div>
              <div
                class="prodprice"
                style="padding: 3px"
              >
                <span>$ {{ prod.product_price }}</span>
              </div>
            </div>
            <el-image
              :src="prod.product_image"
              fit="scale-down"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { mainStore } from "@/store/main.store";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  name: "Menutable",
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
    const mainstore = mainStore();
    const {
      menudatas,
      clickedProductId,
      clickedProductCategoryId,
      dialogVis,
      isModifyMode,
      shoppingProduct
    } = storeToRefs(mainstore);

    function cardClickHandler(productid: number, categoryid: number) {
      // 將點擊之productId與PrdouctCategoryId存入
      clickedProductId.value = productid;
      clickedProductCategoryId.value = categoryid;
      // 控制dialog的開啟與關閉與是否正在修改模式
      dialogVis.value = true;
      isModifyMode.value = false;

      !isModifyMode.value
        ? (shoppingProduct.value = mainstore.setNewshoppingProduct())
        : null;
    }

    return {
      menudatas,
      cardClickHandler
    };
  }
});
</script>
<style scoped>
.el-image {
  width: 30%;
  padding: 1%;
}
.cardContent {
  /* background: aquamarine; */
  display: flex;
  flex-direction: column;
  align-self: stretch;
  justify-content: space-between;
}
.productcard {
  /* background: saddlebrown; */
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
}
.container {
  margin: 0;
}
.el-row {
  margin-bottom: 1%;
}
.el-col {
  margin-top: 1%;
}
.el-card {
  border: 0px;
}
/* .el-row:last-child {
    background-color: antiquewhite;
    margin-bottom: 0;
  } */
</style>
