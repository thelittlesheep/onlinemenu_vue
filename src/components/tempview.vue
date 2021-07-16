<template>
  <p>TempViewPage</p>
  <div v-if="tempdatas.length">
    <table style="border: 3px #ffd382 dashed" cellpadding="10" border="1">
      <th v-for="key in Object.keys(tempdatas[0])" :key="key">
        {{ key }}
      </th>
      <tr v-for="tempdata in tempdatas" :key="tempdata.id">
        <td>{{ tempdata.id }}</td>
        <td>{{ tempdata.temp }}</td>
        <td>{{ tempdata.logtime }}</td>
      </tr>
    </table>
  </div>
  <button @click="load">Update Data</button>
  <!-- <p>My name is {{ name }} and my age is {{ age }}</p> -->
  <!-- <button @click="handleClick">click me</button>
  <button @click="age++">click me add age</button> -->
  <!-- <input type="text" v-model="name" /> -->
</template>

<script lang="ts">
import { ref } from "vue";
import { tempdataDTO } from "./dto";

export default {
  setup() {
    console.log("setup");

    // const name = ref("mario");
    // const age = ref(30);

    // const handleClick = () => {
    //   name.value = "mei";
    //   age.value = 23;
    // };
    type tempdatasDTO = Array<tempdataDTO>;
    const d: tempdatasDTO = [];
    const tempdatas = ref(d);
    const errormsg = ref(null);
    const load = async () => {
      try {
        let data = await fetch("https://nestapi.thelittlesheep.tk/rpi_temp");
        if (!data.ok) {
          throw Error("no data");
        }
        tempdatas.value = await data.json();
        console.log(data);
      } catch (error) {
        errormsg.value = error.message;
        console.log(errormsg.value);
      }
    };
    load();
    return { tempdatas, errormsg, load };
  },
};
</script>
