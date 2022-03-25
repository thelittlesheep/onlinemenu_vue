<template>
  <div class="home">
    <!-- <tempview /> -->
    <my-RWDcontainer>
      <h1>Home Page</h1>
      <el-button type="primary">
        Hello
      </el-button>
      <div style="background: red">
        內容
      </div>
    </my-RWDcontainer>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
// import tempbody from "@/components/tempandhumidity/tempbody.vue";

export default {
  name: "Home",
  // components: { tempbody },
};
</script>

<style></style>
