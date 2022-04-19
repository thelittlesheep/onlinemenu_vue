<template>
  <div class="orderdetail">
    <h6>取餐時間</h6>
    <el-select
      v-model="value"
      placeholder="Select"
    >
      <el-option
        v-for="item in dateoptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </el-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Checkoutorderdetail",
  setup() {
    const value = ref("");
    const dateoptions = [
      {
        value: Date().toString(),
        label: Date().toString()
      },
      {
        value: "Option2",
        label: "Option2",
        disabled: true
      },
      {
        value: "Option3",
        label: "Option3"
      }
    ];
    return { value, dateoptions };
  }
});
</script>

<style scoped></style>
