<template>
  <div class="home">
    <!-- <tempview /> -->
    <div class="resume">
      <div class="title">
        <h2>
          Hank <br />
          Huang
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import tempbody from "@/components/tempbody.vue";

export default {
  name: "Home",
  // components: { tempbody },
};
</script>

<style lang="scss" scoped>
// .home {
//   align-self: center;
//   align-items: center;
//   align-content: space-around;
// }

.resume {
  .title {
    width: 80%;
    height: 300px;
    align-self: center;
    align-items: center;
    align-content: space-around;
    text-align: left;
  }
}
</style>
