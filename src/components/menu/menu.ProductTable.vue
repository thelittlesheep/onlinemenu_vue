<template>
  <div class="productTableBody">
    <div calss="productTableItem">
      <el-row
        v-for="(data, index) in menudatas"
        :key="index"
        :gutter="20"
      >
        <el-col
          :span="24"
          class="productCategoryTitle"
        >
          <h2>{{ data.category_name }}</h2>
        </el-col>
        <el-col
          v-for="(prod, index2) in data.products"
          :key="index2"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="8"
          :xl="6"
          :span="8"
        >
          <el-card
            :id="prod.product_id"
            shadow="hover"
            class="productcard"
            @click="cardClickHandler(prod.product_id, data.category_id)"
          >
            <div class="cardBlock">
              <div class="cardContent">
                <div
                  class="prodname"
                  style="padding: 3px"
                >
                  <span
                    ><h6>{{ prod.product_name }}</h6></span
                  >
                </div>
                <div
                  class="prodprice"
                  style="padding: 3px"
                >
                  <span>$ {{ prod.product_price }}</span>
                </div>
              </div>
              <div class="cardImg">
                <el-image
                  :src="prod.product_image"
                  fit="scale-down"
                >
                  <template #error>
                    <div class="image-slot">
                      <el-icon :size="80"><IconPicture /></el-icon>
                    </div> </template
                ></el-image>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { mainStore } from '@/store/main.store';
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { Picture as IconPicture } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'Menutable',
  components: { IconPicture },
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
    // 當要離開此頁面時，將dialog關閉
    onBeforeRouteLeave(() => {
      dialogVis.value = false;
    });

    return {
      menudatas,
      cardClickHandler
    };
  }
});
</script>
<style scoped>
.productcard {
  height: 100%;
  max-height: 150px;
}
.cardBlock {
  display: flex;
  display: -webkit-flex;
}
.cardContent {
  flex-basis: 100%;
  min-width: 150px;
}
:deep() .el-image__inner {
  max-height: 110px;
}
.productTableBody {
  max-width: 1200px;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  flex-wrap: wrap;
}
/* .el-row:last-child {
  padding-bottom: 0%;
}
.el-row {
  padding-bottom: 1%;
} */
.el-col {
  margin-bottom: 20px;
}
.el-col.productCategoryTitle {
  margin-bottom: 10px;
}
/* .el-row:last-child {
    background-color: antiquewhite;
    margin-bottom: 0;
  } */
</style>
