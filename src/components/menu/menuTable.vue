<template>
  <el-dialog v-model="dialogVisible">
    <Menuprodpop :prodid="onClickProdId" :categoryid="onClickCategoryId" />
  </el-dialog>

  <div class="container p-3">
    <el-row v-for="(data, index) in menudatas" :key="index" :gutter="20">
      <el-col>
        <h2>{{ data.category_name }}</h2>
      </el-col>
      <el-col :span="6" v-for="(prod, index) in data.products" :key="index">
        <el-card
          shadow="hover"
          :id="prod.product_id"
          @click="cardClickHandler(prod.product_id, data.category_id)"
        >
          <el-image
            style="width: 200px; height: 200px padding:1%"
            :src="prod.product_image"
            fit="contain"
          />
          <div class="prodname" style="padding: 3px">
            <span> {{ prod.product_name }} </span>
          </div>
          <div class="prodprice" style="padding: 3px">
            <span> $ {{ prod.product_price }} </span>
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
import Menuprodpop from "./menuprodpop.vue";

export default defineComponent({
  components: { Menuprodpop },
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
    const pinia = usepinia();
    const { menudatas, dialogVis } = storeToRefs(pinia);

    const dialogVisible = dialogVis;
    const onClickProdId = ref(0);
    const onClickCategoryId = ref(0);
    function cardClickHandler(productid: number, categoryid: number) {
      // console.log(id);
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
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  /* background-color: red; */
  border-radius: 4px;
  margin-bottom: 3%;
}
.el-card {
  border: 0;
  /* padding: 20px; */
  /* border-color: rebeccapurple; */
  /* background-color: lightgreen; */
}
/* .el-card__body {
  border: 1px solid blue;
  padding: 0;
} */
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

/* .box-card {
  width: 180px;
} */
</style>
