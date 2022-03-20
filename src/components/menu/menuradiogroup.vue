<template>
  <div v-for="(index, radio) in rgradios" :key="index">
    <el-radio-group
      v-show="radio === 'add'"
      v-model="chooseAdd"
      v-for="(item, index) in rgtype.adjustitems"
      :key="index"
      @change="test"
    >
      <el-radio :label="index">
        <!-- chooseAdd{{ chooseAdd }} chooseRemove{{ chooseRemove }} chooseAdjust{{
          chooseAdjust
        }} -->
        {{ item.adjustitem_name }}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script lang="ts">
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
import { defineComponent, Ref, ref, toRefs, watch } from "vue";
import { Iadjtypes, ImenuGroupByCategory } from "./menuData/menuDataInterface";
export default defineComponent({
  name: "Menuradiogroup",
  props: ["radios", "type"],
  setup(props) {
    const pinia = usepinia();
    const { dialogVis } = storeToRefs(pinia);

    const rgradios: Ref<{ add?: number; remove?: number; adjust?: number }> =
      ref(props.radios);
    const rgtype: Ref<Iadjtypes> = ref(props.type);

    const chooseAdd = ref();
    const chooseRemove = ref();
    const chooseAdjust = ref();

    watch(
      () => dialogVis.value,
      () => {
        chooseAdd.value = NaN;
        chooseRemove.value = NaN;
        chooseAdjust.value = NaN;
      }
    );

    function test(val: any) {
      console.log(val);
    }
    return {
      rgradios,
      rgtype,
      test,
      chooseAdd,
      chooseRemove,
      chooseAdjust,
    };
  },
});
</script>

<style></style>
