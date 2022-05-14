<template>
  <div class="myorder">
    <MyorderBody />
  </div>
</template>

<script lang="ts">
import MyorderBody from "@/components/myorder/myorder.Body.vue";

export default {
  name: "Myorder",
  components: { MyorderBody }
};
</script>
