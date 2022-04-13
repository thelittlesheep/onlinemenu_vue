<template>
  <div class="checkout">
    <my-RWDcontainer>
      <CheckoutBody />
    </my-RWDcontainer>
  </div>
</template>

<script lang="ts">
import CheckoutBody from "@/components/checkout/checkout.Body.vue";

export default {
  name: "Checkout",
  components: { CheckoutBody }
};
</script>
