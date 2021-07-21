<template>
  <div class="about">
    <weatherview />
  </div>
</template>

<script>
import weatherview from "@/components/weatherview.vue";

export default {
  name: "Home",
  components: { weatherview },
};
</script>
