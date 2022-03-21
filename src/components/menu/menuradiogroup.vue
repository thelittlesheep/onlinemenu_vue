<template>
  123
  {{ fAdjustTypesData }}
  <!-- <el-checkbox-group
    v-model="chooseAdd"
    v-for="(item, index) in fAdjustTypes"
    :key="index"
    @change="test(item.adjusttype_name)"
    style="display: block"
    ><div style="padding-bottom: 5px, padding-top: 5px " class="radioopt">
      <el-checkbox :label="index">
        <h6>{{ item.adjusttype_name }}</h6>
      </el-checkbox>
    </div>
  </el-checkbox-group> -->
</template>

<script lang="ts">
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
import { defineComponent, PropType, Ref, ref, watch } from "vue";
import { Iadjtypes, ImenuGroupByCategory } from "./menuData/menuDataInterface";
export default defineComponent({
  name: "Menuradiogroup",
  props: {
    propfAdjustTypesData: { type: Object as PropType<Iadjtypes> },
  },
  //   props: ["propfCategoryData"],
  setup(props) {
    const pinia = usepinia();
    const { dialogVis } = storeToRefs(pinia);

    const fAdjustTypesData: Ref<Iadjtypes> = ref(
      props.propfAdjustTypesData as Iadjtypes
    );
    // const fAdjustTypes = fCategoryData.value.adjusttypes;

    const chooseAdd = ref();
    const chooseRemove = ref();
    const chooseAdjust = ref();
    const choose: Ref<string[]> = ref([]);
    const finalPrice: Ref<number> = ref(0);

    watch(
      () => [props.propfAdjustTypesData, dialogVis.value],
      ([newprop, val]) => {
        console.log(val);

        fAdjustTypesData.value = newprop as Iadjtypes;
        choose.value = [];
      }
    );

    function test(val: string) {
      choose.value.push(val);
      console.log(choose.value);
    }
    return {
      fAdjustTypesData,
      test,
      chooseAdd,
      chooseRemove,
      chooseAdjust,
    };
  },
});
</script>

<style scoped>
/* .radioopt {
  opacity: 0.3;
} */
.radioopt:hover {
  background-color: #f8f8f8;
}
</style>
