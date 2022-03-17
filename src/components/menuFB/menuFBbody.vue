<template>
  <div class="container p-3" style="background-color: orange">
    <div
      v-for="(data, index) in menudatas"
      :key="index"
      class="row align-items-center p-3 m-3 b-3"
      style="background-color: MediumSeaGreen"
    >
      <!-- {{ data }} -->
      {{ data.category_name }}
      <div
        v-for="(prods, index) in data.products"
        :key="index"
        class="col p-3 m-3"
        style="background-color: Bisque"
      >
        {{ prods.product_name }}
        <!-- <div
          v-for="(adjtype, index) in data.adjusttypes"
          :key="index"
          name="adjtype"
          class="col p-3 m-3"
          style="background-color: CornflowerBlue"
        >
          {{ adjtype.adjusttype_name }}
          <br />
          <span
            v-for="(adjitem, index) in adjtype.adjustitems"
            :key="index"
            style="background-color: Khaki"
          >
            <input type="checkbox" />{{ adjitem.adjustitem_name }}
            &ensp;
          </span>
        </div> -->
      </div>
    </div>
  </div>
  <button @click="getmenuDatas()">Fetch Data</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
import { AxiosError } from "axios";
import { responseError } from "../interfaces/responseError";
import { axiosGetmenuDatas } from "./menuData";

export default defineComponent({
  // components: { menutable, ordersection },
  setup() {
    // init pinia
    const pinia = usepinia();
    const { menudatas } = storeToRefs(pinia);
    async function getmenuDatas() {
      try {
        const res = await axiosGetmenuDatas();
        // const resdata = res.data;
        menudatas.value = res.data;
        // console.log(res.data);
      } catch (e: unknown) {
        const errors = e as AxiosError<responseError>;
        console.log(errors.response!.data);
      } finally {
        console.log("End");
      }
    }

    return { getmenuDatas, menudatas };
  },
});
</script>

<style></style>
