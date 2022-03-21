<template>
  <div>
    <el-image
      style="width: 90%; height: 1vh padding:1%"
      :src="filteredProductData.product_image"
      fit="contain"
    />
    <h2>
      {{ filteredProductData.product_name }}
    </h2>
    <!-- <h3>$ {{ filteredProductData.product_price }}</h3> -->
    <div v-for="(type, index) in filteredCategoryData.adjusttypes" :key="index">
      <div v-if="type.adjustitems?.length">
        <el-collapse>
          <el-collapse-item name="1">
            <template v-slot:title
              ><h5>{{ type.adjusttype_name }}</h5></template
            >
            <!-- {{ type }} -->
            <Menuradiogroup :propfAdjustTypesData="type" />
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
import { defineComponent, Ref, ref, toRefs, watch } from "vue";
import {
  Iadjitem,
  Icategory,
  ImenuGroupByCategory,
  Iproductdata,
} from "./menuData/menuDataInterface";
import Menuradiogroup from "./menuradiogroup.vue";

export default defineComponent({
  name: "Menuprodpop",
  props: ["prodid", "categoryid"],
  components: { Menuradiogroup },
  setup(props) {
    const pinia = usepinia();
    const { menudatas, dialogVis } = storeToRefs(pinia);

    // let onClickProductId = toRefs(props).prodid;
    const onClickProductId: Ref = ref(props.prodid);
    const onClickCategoryId: Ref = ref(props.categoryid);

    const filteredCategoryData: Ref<ImenuGroupByCategory> = ref(
      {} as ImenuGroupByCategory
    );
    const filteredProductData: Ref<Iproductdata> = ref({} as Iproductdata);
    filteredCategoryData.value = updateClickCategory();
    filteredProductData.value = updateClickProduct();

    function updateClickProduct() {
      // let adjusttypes = filteredCategoryData.value.adjusttypes;
      // let radiosAvailableType: string[] = [];
      // adjusttypes.forEach((item) => {
      //   if ((item.adjustitems as Iadjitem[]).length !== 0) {
      //     radiosAvailableType.push(item.adjusttype_type);
      //   }
      // });
      // console.log(radiosAvailableType);

      // console.log(radiosAvailableType.reduce((a, v) => ({ ...a, [v]: 0 }), {}));

      // radios.value = radiosAvailableType.reduce(
      //   (a, v) => ({ ...a, [v]: 0 }),
      //   {}
      // );

      // console.log(radios.value);

      return menudatas.value
        .find(isClickCategory)
        ?.products.find(isClickProduct) as Iproductdata;
    }

    function updateClickCategory() {
      return menudatas.value.find(isClickCategory) as ImenuGroupByCategory;
    }

    function isClickProduct(product: Iproductdata) {
      return product.product_id === onClickProductId.value ? true : false;
    }

    function isClickCategory(category: Icategory) {
      return category.category_id === onClickCategoryId.value ? true : false;
    }

    // watch props change to action
    watch(
      () => [props.prodid, props.categoryid],
      ([newProductId, newCategoryId]) => {
        onClickCategoryId.value = newCategoryId;
        onClickProductId.value = newProductId;
        filteredCategoryData.value = updateClickCategory();
        filteredProductData.value = updateClickProduct();
      }
    );

    // watch wether dialog is visiable
    watch(
      () => dialogVis.value,
      (val) => {
        if (val === true) {
          console.log("hello");
        }
      }
    );

    return {
      onClickProductId,
      menudatas,
      isClickCategory,
      filteredCategoryData,
      filteredProductData,
    };
  },
});
</script>

<style scpoed>
.el-collapse-item {
  font-size: 30px;
}
/* .radioDiv {
  margin: 0 auto;
  width: auto;
  text-align: left;
  display: table;
} */
</style>
