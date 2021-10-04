<template>
  <div class="weather">
    <weatherbody />
  </div>
</template>

<script>
import weatherbody from "@/components/weatherbody.vue";

export default {
  name: "Weather",
  components: { weatherbody },
};
</script>
