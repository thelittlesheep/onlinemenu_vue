<template>
  <h2>123</h2>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from "vue";
import { IgroupedProps, IorderItem } from "./menuData/menuDataInterface";

export default defineComponent({
  props: {
    orders: {
      type: Object as PropType<Ref<Map<string, IorderItem>>>,
      required: true,
    },
  },
  setup(props) {
    const orderItemS = ref(props.orders);
    // const orderItemSval = orderItemS.value;
    // console.log(orderItemS.value);

    return { orderItemS };
  },
});
</script>

<style></style>
