<template>
  <h1>This is 菜單 component section</h1>
  <div class="menuFB">
    <menuFBbody />
  </div>
</template>

<script lang="ts">
import menuFBbody from "@/components/menu/menuBody.vue";

export default {
  name: "Menu",
  components: { menuFBbody },
};
</script>
