<template>
  <div class="myorder">
    <my-RWDcontainer>
      <MyorderBody />
    </my-RWDcontainer>
  </div>
</template>

<script lang="ts">
import MyorderBody from "@/components/myorder/myorder.Body.vue";

export default {
  name: "Myorder",
  components: { MyorderBody }
};
</script>
