<template>
  <h3>Your choice is {{ store }}</h3>
  <!-- <input v-model="store" placeholder="Input a Store" />
  <input type="submit" @click="loadData()" value="Submit" /> -->
  <!-- <br /><br /> -->
  <select v-model="selectedStore" @change="loadData($event)">
    <option value="" disabled selected>--請選擇--</option>
    <option v-for="store in storeOption" :value="store" :key="store.value">
      {{ store }}
    </option>
  </select>
  <!-- <span>Selected: {{ selected }}</span> -->
  <br /><br />
  {{ orderItemS }}
  <br /><br />
  <div v-if="menuDatas.length" class="temp">
    <menutable v-bind:groupedProps="groupedProps" />
  </div>
  <div>
    <ordersection v-bind:groupedProps="groupedProps" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { db } from "@/api/firebase";
import {
  Imenudata,
  IorderItem,
  IgroupedProps,
  IorderItems,
} from "./menuData/menuDataInterface";
import { getMenu } from "./menuData/menuData";
import { HandleNameChangeInterface } from "../interfaces/domHandle";
import menutable from "./menuFBTable.vue";
import ordersection from "./orderSection.vue";

export default defineComponent({
  components: { menutable, ordersection },
  setup() {
    const store = ref<string>("");
    const menuDatas = ref<Imenudata[]>([]);
    // const datasTitle = ref<string[]>([]);
    // const datasTitle: string[] = ["餐點名稱", "價錢", "加蛋", "加起司", "數量"];
    const storeOption = ref<string[]>(["城市漢堡", "活力菓霖"]);
    const selectedStore = ref<string>("");

    const orderItemS = ref<Map<string, IorderItem>>(new Map());

    const loadData = async (event: HandleNameChangeInterface) => {
      store.value = event.target.value;
      orderItemS.value.clear();
      getMenu(db, store.value, "漢堡").then((res) => (menuDatas.value = res));
    };
    const groupedProps: IgroupedProps = {
      datas: menuDatas,
      orders: orderItemS,
    };
    return {
      menuDatas,
      store,
      storeOption,
      selectedStore,
      orderItemS,
      groupedProps,
      loadData,
    };
  },
});
</script>

<style></style>
