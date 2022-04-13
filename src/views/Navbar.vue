<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-menu-item
      v-for="item in tabItems"
      :key="item"
      :index="item.routepath"
      :route="{ path: item.routepath }"
    >
      {{ item.name }}
    </el-menu-item>
    <el-button
      class="opencartbutton"
      type="primary"
      @click="openDrawer()"
    >
      Open Cart
    </el-button>
  </el-menu>
  <!-- <div class="h-6" /> -->
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { usepinia } from "@/store/pinia";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "Navbar",
  setup() {
    const route = useRoute();

    // 直接在 :default-active 加上 route.fullpath 即可完成重新載入頁面後，
    // 仍保持 Navbar 之 menu-item 在正確的 tab 上啟用

    // 另一種監聽路由的方法
    const activeIndex = ref();
    watch(route, (val) => {
      activeIndex.value = val.fullPath;
    });

    const tabItems = [
      {
        name: "Home",
        routepath: "/"
      },
      // {
      //   name: "Createuser",
      //   routepath: "/createuser"
      // },
      {
        name: "Menu",
        routepath: "/menu"
      }
      // {
      //   name: "Aboutme",
      //   routepath: "/aboutme"
      // }
    ];
    // const handleSelect = (key: string, keyPath: string[]) => {
    //   console.log(key, keyPath);
    // };
    const { drawer } = storeToRefs(usepinia());
    function openDrawer() {
      drawer.value = true;
    }
    return { activeIndex, tabItems, route, openDrawer };
  }
});
</script>

<style scoped>
.opencartbutton {
  align-self: center;
  margin-left: auto;
  margin-right: 1rem;
}
</style>
