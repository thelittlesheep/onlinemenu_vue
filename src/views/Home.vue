<template>
  <div class="home">
    <tempview />
  </div>
</template>

<script>
// @ is an alias to /src
import tempview from "@/components/tempview.vue";

export default {
  name: "Home",
  components: { tempview },
};
</script>

<style>
.home {
  align-self: center;
  align-items: center;
  align-content: space-around;
}
</style>
