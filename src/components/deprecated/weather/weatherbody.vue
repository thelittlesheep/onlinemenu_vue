<template>
  <h1>This is Weather Page!</h1>
  <button @click="getdata()">
    Get Data
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const getdata = async () => {
      await store.dispatch("getWeatherData");
    };
    return { getdata };
  },
});
</script>
