<template>
  <el-checkbox-group
    v-for="(item, index) in fAdjustTypesData.adjustitems"
    :key="index"
    v-model="checkbox"
    style="display: block"
  >
    <div class="checkopt">
      <el-checkbox :label="item.adjustitem_id">
        <el-row>
          <el-col
            :span="20"
            name="item"
          >
            <strong>{{ item.adjustitem_name }}</strong>
          </el-col>
          <el-col
            :span="4"
            name="price"
            style="text-align: end"
          >
            +$ {{ item.adjustitem_priceadjust }}
          </el-col>
        </el-row>
      </el-checkbox>
    </div>
  </el-checkbox-group>
</template>

<!-- <script
  setup
  lang="ts"
>
const props = defineProps({
  foo: String,
  bar: Number
});
const test = 123;
</script> -->
<script lang="ts">
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
import { defineComponent, PropType, Ref, ref } from "vue";
import { Iadjtypes } from "@/interface/menuData.Interface";
export default defineComponent({
  name: "Menuadjustitemcheckbox",
  props: {
    // eslint-disable-next-line vue/require-default-prop
    propfAdjustTypesData: { type: Object as PropType<Iadjtypes> }
  },
  //   props: ["propfCategoryData"],
  setup(props) {
    const pinia = usepinia();
    const { checkbox } = storeToRefs(pinia);

    const fAdjustTypesData: Ref<Iadjtypes> = ref(
      props.propfAdjustTypesData as Iadjtypes
    );

    // watch(
    //   () => checkbox.value,
    //   (newval) => {
    //     console.log(newval);
    //   }
    // );

    return {
      checkbox,
      fAdjustTypesData
    };
  }
});
</script>

<style scoped>
.el-checkbox__label {
  display: inline-block;
  width: 100%;
}
.checkopt .el-col {
  padding-left: 2%;
}
.checkopt {
  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 3%;
  padding-right: 3%;
}

.checkopt:hover {
  background-color: #f8f8f8;
}
</style>
