<template>
  <p>TempViewPage</p>
  <div class="cavs">
    <div
      v-if="tempdatas.length"
      class="temp"
    >
      <table>
        <th
          v-for="key in tempdataTitle"
          :key="key"
        >
          {{ key }}
        </th>
        <tr
          v-for="tempdata in tempdatas"
          :key="tempdata.id"
        >
          <td>{{ tempdata.id }}</td>
          <td>{{ tempdata.logtime.toLocaleString() }}</td>
          <td>{{ tempdata.temp }}</td>
        </tr>
      </table>
    </div>
    <br />
    <button @click="autoupdate()">
      {{ msg }}
    </button>
    <h3 v-show="isShowError">test t or f</h3>
    <h3>{{ errormsg }}</h3>
    <h1>WebSocket test area</h1>
    <div
      v-if="tempdatas.length"
      class="temp"
    >
      <table>
        <th
          v-for="key in tempdataTitle"
          :key="key"
        >
          {{ key }}
        </th>
        <tr
          v-for="tempdata in tempdatas"
          :key="tempdata.id"
        >
          <td>{{ tempdata.id }}</td>
          <td>{{ tempdata.logtime.toLocaleString() }}</td>
          <td>{{ tempdata.temp }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { tempdataDTO } from './tempdatadto';
import { AxiosResponse } from 'axios';
import { asyncget } from '@/api/http';
import { format } from 'date-fns';
export default defineComponent({
  setup() {
    type tempdatasDTO = Array<tempdataDTO>;
    // const d: tempdatasDTO = [];
    // const tempdataTitle = ref({
    //   id: Number,
    //   logtime: Date,
    //   temp: Number,
    // });
    const tempdataTitle = ref<string[]>([]);
    const tempdatas = ref<tempdataDTO[]>([]);
    const errormsg = ref(null);
    const isStop = ref(true);
    const isShowError = ref(false);
    const msg = ref('Start auto update tempdata');

    const load = async () => {
      try {
        const res: AxiosResponse<tempdatasDTO> = (await asyncget(
          'https://apiprod.thelittlesheep.tk/rpi_temp'
        )) as AxiosResponse;
        // if (res.status != 200) {
        //   isShowError.value = true;
        //   console.log(isShowError.value);
        // }
        tempdatas.value = await res.data;

        tempdataTitle.value = Object.keys(res.data[0]);

        tempdatas.value.forEach((element) => {
          // console.log(element.logtime);
          const date = Date.parse(element.logtime);
          element.logtime = format(date, 'yyyy/MM/dd HH:mm:ss');
        });
      } catch (error: any) {
        errormsg.value = error;
      }
    };
    const autoupdate = async () => {
      if (isStop.value != true) {
        isStop.value = !isStop.value;
        msg.value = 'Start auto update tempdata ';
      } else {
        isStop.value = !isStop.value;
        msg.value = 'Stop auto update tempdata ';
      }
      await load();
      // async function sleep(ms = 0) {
      //   return new Promise((r) => setTimeout(r, ms));
      // }
      // while (isStop.value != true) {
      //   await sleep(1000);
      //   await load();
      // }
    };

    load();
    return {
      tempdatas,
      errormsg,
      load,
      msg,
      isStop,
      isShowError,
      autoupdate,
      tempdataTitle
    };
  }
  // methods: {
  //   async loadM() {
  //     try {
  //       let res: AxiosResponse = await asyncget(
  //         "https://nestapi.thelittlesheep.tk/rpi_temp"
  //       );
  //       this.tempdatas = await res.data;
  //     } catch (error) {
  //       this.errormsg = error;
  //     }
  //   },
  // },
});
</script>

<style>
.temp table {
  font-size: 20px;
  background: #ffd382;
  margin: auto;
  border: solid cadetblue;
  border-collapse: separate;
  border-spacing: 2;
  border-radius: 3%;
}
td:first-child {
  border-top-left-radius: 10px;
  /* border-bottom-left-radius: 10px; */
}

td:last-child {
  border-top-right-radius: 10px;
  /* border-bottom-right-radius: 10px; */
}
.temp td {
  border-top: 3px solid chocolate;
}
button {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: bolder;
  transition-duration: 0.2s;
  background: thistle;
  border: none;
  border-radius: 10px;
  padding: 15px 15px;
}
button:hover {
  background-color: cadetblue; /* Green */
  color: white;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style>
