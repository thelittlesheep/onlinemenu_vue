<template>
  <div>
    <ul v-for="(value, key) in orderItemS.value" :key="key">
      {{
        value.name
      }}
      {{
        value.price
      }}
      {{
        value.orderItemQty
      }}
    </ul>
  </div>
  <!-- <h2>123</h2> -->
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { IgroupedProps, IorderItem } from "./menuData/menuDataInterface";

export default defineComponent({
  props: {
    groupedProps: { type: Object as PropType<IgroupedProps>, required: true },

    // OrderItemS: { type: Object as PropType<IOrderItem[]>, required: true },
  },
  setup(props) {
    const orderItemS = ref(props.groupedProps.orders);
    // console.log(orderItemS.value.keys);

    return { orderItemS };
  },
});
</script>

<style></style>
