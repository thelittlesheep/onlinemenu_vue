<template>
  <div>
    <el-image
      :src="singleProductTempData.product_image"
      fit="contain"
    />
    <div style="padding-left: 3%; padding-right: 3%">
      <h2>{{ singleProductTempData.product_name }}</h2>
    </div>
    <div
      v-for="(type, index) in filteredCategoryData.adjusttypes"
      :key="index"
    >
      <el-collapse
        v-if="type.adjustitems?.length"
        v-model="activateCollapseItem"
      >
        <el-collapse-item
          :name="index"
          accordion="false"
        >
          <template #title>
            <div style="padding: 3%">
              <h5>{{ type.adjusttype_name }}</h5>
            </div>
          </template>
          <Menuradiogroup :propf-adjust-types-data="type" />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";
import { defineComponent, Ref, ref, watch } from "vue";
import {
  Iadjitem,
  Iadjtypes,
  Icategory,
  ImenuGroupByCategory,
  Iproductdata
} from "./menuData/menuDataInterface";
import Menuradiogroup from "./menuAdjustItems.vue";
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  name: "Menuprodpop",
  components: { Menuradiogroup },
  props: {
    prodid: { type: Number, default: 0 },
    categoryid: { type: Number, default: 0 }
  },
  setup(props) {
    const pinia = usepinia();
    const {
      menudatas,
      singleProductTempData,
      checkbox,
      cartData,
      clickedCartItemId
    } = storeToRefs(pinia);

    // checkbox.value = [];

    // let onClickProductId = toRefs(props).prodid;
    const onClickProductId: Ref = ref(props.prodid);
    const onClickCategoryId: Ref = ref(props.categoryid);
    const activateCollapseItem = ref([0, 1, 2]);

    const filteredCategoryData: Ref<ImenuGroupByCategory> = ref(
      {} as ImenuGroupByCategory
    );
    const filteredProductData: Ref<Iproductdata> = ref({} as Iproductdata);

    if (clickedCartItemId.value === "") {
      filteredCategoryData.value = updateClickCategory();
      filteredProductData.value = updateClickProduct();
      console.log(filteredCategoryData.value);

      singleProductTempData.value = {
        itemCartId: uuidv4(),
        ...filteredProductData.value,
        category_id: filteredCategoryData.value.category_id,
        adjustitems: [] as Array<Iadjitem>,
        qty: 1,
        afterAdjustSinglePrice: filteredProductData.value.product_price,
        finalPrice: filteredProductData.value.product_price
      };
    }

    function updateClickProduct() {
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

    function modifysingleProductTempDataadjustitems(val: Array<number>) {
      val.forEach((selectedId) => {
        // console.log(selectedId);
        filteredCategoryData.value.adjusttypes.forEach((category) => {
          category.adjustitems?.forEach((adjustitems) => {
            if (adjustitems.adjustitem_id === selectedId) {
              if (
                singleProductTempData.value.adjustitems?.indexOf(
                  adjustitems
                ) === -1
              ) {
                // console.log(adjustitems);
                singleProductTempData.value.adjustitems?.push(adjustitems);
                singleProductTempData.value.afterAdjustSinglePrice +=
                  adjustitems.adjustitem_priceadjust;
                singleProductTempData.value.finalPrice =
                  singleProductTempData.value.afterAdjustSinglePrice;
              }
            }
          });
        });
      });
    }

    watch(
      () => checkbox.value,
      (afterVal, beforeVal) => {
        if (afterVal.length > beforeVal.length) {
          modifysingleProductTempDataadjustitems(afterVal);
        }
        //  else {
        //   singleProductTempData.value.adjustitems = [];
        //   singleProductTempData.value.afterAdjustSinglePrice =
        //     filteredProductData.value.product_price;
        //   modifysingleProductTempDataadjustitems(afterVal);
        // }

        // console.log(val)
      }
    );

    // watch(() => singleProductTempData.value, (val) => {
    //   console.log(val)
    // })

    // watch props change to action
    // watch(
    //   () => [props.prodid, props.categoryid],
    //   ([newProductId, newCategoryId]) => {
    //     onClickCategoryId.value = newCategoryId;
    //     onClickProductId.value = newProductId;
    //     filteredCategoryData.value = updateClickCategory();
    //     filteredProductData.value = updateClickProduct();
    //   }
    // );

    // watch wether dialog is visiable
    // watch(
    //   () => dialogVis.value,
    //   (val) => {
    //     if (val === true) {
    //       activateCollapseItem.value = [0, 1, 2]
    //     }
    //   }
    // );

    return {
      singleProductTempData,
      activateCollapseItem,
      onClickProductId,
      menudatas,
      isClickCategory,
      filteredCategoryData,
      filteredProductData
    };
  }
});
</script>

<style scpoed>
div.el-collapse {
  border-top: 0;
  border-bottom: 0;
}
div.el-collapse-item__header {
  border-bottom: 0;
}
.el-collapse-item {
  font-size: 30px;
}

.el-dialog .el-dialog__body {
  padding: 0;
}

.el-dialog .el-dialog__footer {
  padding-top: 10px;
  width: 100%;
  justify-content: center;
  display: flex;
  /* border: 5px solid #ffff00; */
  /* background-color: #99a9bf; */
}

.el-collapse-item__content {
  padding-bottom: 10px;
}

.el-checkbox.el-checkbox--default {
  width: 100%;
  /* background-color: blue; */
}

.el-checkbox__label {
  width: 100%;
  /* background-color: aquamarine; */
}

#item {
  background-color: yellow;
}

#price {
  background-color: plum;
  align-content: end;
}
</style>
