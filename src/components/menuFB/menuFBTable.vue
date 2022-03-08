<template>
  <table>
    <th v-for="key in datasTitle" :key="key">
      {{ key }}
    </th>
    <tr v-for="data in datas" :key="data.id">
      <td>{{ data.nameShow }}</td>
      <td :class="data.name">{{ data.priceShow }}</td>
      <td v-if="data.canAddEgg">
        <input type="checkbox" name="myTextEditBox" />
      </td>
      <td v-else>
        <input type="checkbox" disabled />
      </td>
      <td v-if="data.canAddCheese">
        <input type="checkbox" name="myTextEditBox" />
      </td>
      <td v-else>
        <input type="checkbox" disabled />
      </td>
      <td>
        <select
          :key="data.name"
          :name="data.name"
          @change="getOrderItem($event)"
        >
          <option value="0" selected>0</option>
          <option v-for="index in 5" :value="index" :key="index">
            {{ index }}
          </option>
        </select>
      </td>
    </tr>
  </table>
  <br /><br />
  <ul v-for="item in AorderItemS" :key="item">
    {{
      item.name
    }}
    {{
      item.price
    }}
    {{
      item.orderItemQty
    }}
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onUpdated } from "vue";
import {
  Imenudata,
  IorderItem,
  IgroupedProps,
} from "./menuData/menuDataInterface";
import { HandleNameChangeInterface } from "../interfaces/domHandle";

export default defineComponent({
  emits: {},
  props: {
    groupedProps: { type: Object as PropType<IgroupedProps>, required: true },
    // datas: { type: Object as PropType<Imenudata>, required: true },
    // singleOrderItem: ref,
  },
  setup(props, context) {
    const datasTitle: string[] = ["餐點名稱", "價錢", "加蛋", "加起司", "數量"];
    const datas = ref(props.groupedProps.datas);
    const orderItemS = ref(props.groupedProps.orders);
    let AorderItemS = ref<IorderItem[]>([]);
    // const map = new Map<string, IorderItem>();

    const getOrderItem = async (event: HandleNameChangeInterface) => {
      let orderItem = {} as IorderItem;
      AorderItemS.value = [];
      const name = event.target.name;
      const qty = Number(event.target.value);
      if (!orderItemS.value.has(name)) {
        datas.value.forEach((e) => {
          if (e.name === name) {
            orderItem = e;
            orderItem.orderItemQty = qty;
            orderItemS.value.set(e.name, orderItem);
            // console.log(orderItemS.value.get(e.name));
          }
        });
      } else {
        if (qty === 0) {
          orderItemS.value.delete(name);
        } else {
          orderItemS.value.get(name)!.orderItemQty = qty;
        }
      }
      // orderItemS.value.forEach((val) => AorderItemS.value.push(val));
      // AorderItemS.value.forEach((e) => console.log(e));
      AorderItemS.value = Array.from(orderItemS.value.values());
      // console.log(orderItemS.value);
      // console.log(AorderItemS.value);
    };

    // onUpdated(() => {
    //   AorderItemS.value = [];
    // });
    async function clearOrder() {
      context.emit;
      AorderItemS.value = [];
    }
    return { datasTitle, datas, getOrderItem, orderItemS, AorderItemS };
  },
});
</script>
