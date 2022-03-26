<template>
  <el-row
    :gutter="50"
    align="middle"
  >
    <el-col :span="8">
      <el-input-number
        v-model="singleProductTempData.qty"
        :min="1"
        :max="10"
        name="selector"
      />
    </el-col>
    <el-col
      :span="16"
      name="button"
    >
      <el-button
        size="large"
        @click="test"
      >
        <template #icon>
          <el-icon size="24px">
            <ShoppingCart />
          </el-icon>
        </template>
        <div>
          <span>Add {{ singleProductTempData.qty }} to cart</span>
          <span>NT$ {{ finalPrice }}</span>
        </div>
        <!-- <el-row>
                    <el-col :span="16">Add 1 to cart</el-col>
                    <el-col :span="8">NT${{ singleProductTempData.product_price }}</el-col>
                </el-row>-->
      </el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
import { ShoppingCart } from "@element-plus/icons-vue";

export default defineComponent({
  name: "Addtocart",
  components: { ShoppingCart },
  setup() {
    const pinia = usepinia();
    const { singleProductTempData ,cartData} = storeToRefs(pinia);
    const finalPrice = ref(
      singleProductTempData.value.finalPrice * singleProductTempData.value.qty,
    );
    function test(){
      cartData.value.push(singleProductTempData.value)
    }

    watch(
      () => [
        singleProductTempData.value.finalPrice,
        singleProductTempData.value.qty,
      ],
      () => {
        finalPrice.value =
          singleProductTempData.value.finalPrice *
          singleProductTempData.value.qty;
      },
    );

    return { ShoppingCart, singleProductTempData, finalPrice, test };
  },
});
</script>

<style scoped>
/* .el-button span {
    display: inline-block;
    width: 100px;
    background-color: aqua;
}
.el-button span .el-row {
    align-content: center;
    display: inline-block;
    width: 25vw;
    background: violet;
}
.el-button span div.el-row div.el-col {
    background: sandybrown;
} */
.el-button span {
  display: inline-block;
  width: 80%;
  /* background: aquamarine; */
}
.el-button {
  /* background-color: wheat; */
  /* padding: 0; */
  width: 100%;
}
.el-row {
  width: 100%;
  padding-top: 2%;
  /* border: 5px solid #ffff00; */
  /* background-color: firebrick; */
}
</style>
