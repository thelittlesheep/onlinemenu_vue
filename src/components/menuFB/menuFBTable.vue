<template>
  <!-- <table>
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
  </table> -->
  <br /><br />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onUpdated, Ref } from "vue";

export default defineComponent({
  emits: {},
  props: {},
  setup(props, context) {
    const datasTitle: string[] = ["餐點名稱", "價錢", "加蛋", "加起司", "數量"];
    return { datasTitle };
  },
});
</script>
