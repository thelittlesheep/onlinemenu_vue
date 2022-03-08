<template>
  <h1>Test area</h1>
  <h2>{{ user }}</h2>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
import { userDTO } from "../interfaces/userDTO";
export default defineComponent({
  setup() {
    const pinia = usepinia();
    const { user } = storeToRefs(pinia);
    return { user };
  },
});
</script>

<style></style>
