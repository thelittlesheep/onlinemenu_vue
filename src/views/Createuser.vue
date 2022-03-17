<template>
  <h1>This is menu component section</h1>
  <div class="createuserbody">
    <createuserbody />
  </div>
  <!-- <h2>=============================</h2> -->
  <!-- <h1>This is menuFB component section</h1>
  <div class="menuFB">
    <menuFBbody />
  </div> -->
</template>

<script lang="ts">
import createuserbody from "@/components/createuser/createuser.body.vue";

export default {
  name: "Createuser",
  components: { createuserbody },
};
</script>
