<template>
  <div id="resume">
    <div id="info">
      <div id="title">
        <h4>PERSONAL<br />INFORMATION</h4>
      </div>
      <!-- <img src="./profile.jpg" alt="profilepic" id="profilepic"> -->
      <div id="name">
        <span>Name:Hank Huang<br />(Zheng-Yang, Huang)</span>
      </div>
      <div id="mail">
        <span>E-mail: u106029202@gap.kmu.edu.tw</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Aboutme",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
// .home {
//   align-self: center;
//   align-items: center;
//   align-content: space-around;
// }

@import url(//fonts.googleapis.com/earlyaccess/notosanstc.css);
body {
  font-family: "Noto Sans TC";
  background-color: aliceblue;
  font-size: 14px;
}

#resume {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px 5px;
  align-items: center;
  border-top: 10px solid aquamarine;
}

#info {
  display: grid;
  gap: 5% 5%;
}

#profilepic {
  height: 200px;
  width: 200px;
}
</style>
