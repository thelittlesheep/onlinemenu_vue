<template>
  <!-- <h1>This is menu component section</h1> -->
  <div class="menu">
    <menubody />
  </div>
  <!-- <h2>=============================</h2> -->
  <!-- <h1>This is menuFB component section</h1>
  <div class="menuFB">
    <menuFBbody />
  </div> -->
</template>

<script lang="ts">
import menubody from "@/components/menu/menu.body.vue";
// import menuFBbody from "@/components/menuFB/menuFBbody.vue";

export default {
  name: "Menu",
  components: { menubody },
};
</script>
