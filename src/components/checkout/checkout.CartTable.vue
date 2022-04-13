<template>
  <el-table
    :data="cartData"
    size="large"
    :fit="true"
    show-summary
    sum-text="小計"
  >
    <el-table-column
      key="slot"
      prop="product_name"
      label="Product"
    >
      <template #default="scope">
        {{ scope.row.product_name }}
        <ol
          v-if="cartData[scope.$index].shoppingProduct_adjustitems.length !== 0"
          style="margin-bottom: 0"
        >
          <li
            v-for="item in cartData[scope.$index].shoppingProduct_adjustitems"
            :key="item.adjustitem_id"
          >
            {{ item.adjustitem_name }}
          </li>
        </ol>
      </template>
    </el-table-column>
    <el-table-column
      prop="shoppingProduct_qty"
      label="Quantity"
      align="center"
    />
    <el-table-column
      prop="shoppingProduct_finalPrice"
      label="Price"
      align="center"
    />
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "Checkoutcarttable",
  setup() {
    const pinia = usepinia();
    const { cartData } = storeToRefs(pinia);

    return {
      cartData
    };
  }
});
</script>

<style scoped></style>
